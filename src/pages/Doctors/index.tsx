import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useState, useMemo } from 'react';
import { OfficeLocation, Speciality } from '../../types';
import { useDoctors } from '../../hooks';
import { dataStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';


// Helper function to format speciality display name
const formatSpeciality = (speciality: string) => {
    return speciality
        .replace('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase());
};

// Helper function to get location color
const getLocationColor = (location: OfficeLocation) => {
    switch (location) {
        case OfficeLocation.Athens:
            return 'primary';
        case OfficeLocation.Thessaloniki:
            return 'success';
        case OfficeLocation.Patras:
            return 'warning';
        default:
            return 'neutral';
    }
};

export default observer(function Doctors() {
    const navigate = useNavigate();
    const { doctors, loading } = useDoctors();
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [selectedSpeciality, setSelectedSpeciality] = useState<string>('all');

    // Filter doctors based on selected location and speciality
    const filteredDoctors = useMemo(() => {
        return doctors.filter(doctor => {
            const locationMatch = selectedLocation === 'all' || doctor.officelocation === selectedLocation;
            const specialityMatch = selectedSpeciality === 'all' || doctor.speciality === selectedSpeciality;
            return locationMatch && specialityMatch;
        });
    }, [doctors, selectedLocation, selectedSpeciality]);

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Typography level='h2' component='h1' sx={{ mt: 1, mb: 2 }}>
                    Doctors
                </Typography>
                <Typography level='body-md' sx={{ mb: 3 }}>
                    Browse available doctors and their specialties
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <FormControl>
                        <FormLabel sx={{ mb: 1 }}>Filter by Location:</FormLabel>
                        <RadioGroup
                            orientation="horizontal"
                            value={selectedLocation}
                            onChange={(event) => setSelectedLocation(event.target.value)}
                            sx={{ gap: 2 }}
                        >
                            <Radio value="all" label="All Locations" />
                            <Radio value={OfficeLocation.Athens} label="Athens" />
                            <Radio value={OfficeLocation.Thessaloniki} label="Thessaloniki" />
                            <Radio value={OfficeLocation.Patras} label="Patras" />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <FormControl>
                        <FormLabel sx={{ mb: 1 }}>Filter by Speciality:</FormLabel>
                        <Select
                            value={selectedSpeciality}
                            onChange={(_, value) => setSelectedSpeciality(value as string)}
                            sx={{ minWidth: 200 }}
                        >
                            <Option value="all">All Specialities</Option>
                            {dataStore.specialitiesList.map((speciality: Speciality) => (
                                <Option key={speciality} value={speciality}>
                                    {formatSpeciality(speciality)}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Sheet
                variant='outlined'
                sx={{
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                {loading ? (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography level="body-md">Loading doctors...</Typography>
                    </Box>
                ) : (
                    <Table
                    aria-labelledby='doctors-table'
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground':
                            'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground':
                            'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '12px',
                        '--TableCell-paddingX': '12px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: '40%', padding: '12px' }}>
                                <Typography
                                    level='title-sm'
                                    sx={{ fontWeight: 'lg' }}
                                >
                                    Doctor
                                </Typography>
                            </th>
                            <th style={{ width: '30%', padding: '12px' }}>
                                <Typography
                                    level='title-sm'
                                    sx={{ fontWeight: 'lg' }}
                                >
                                    Speciality
                                </Typography>
                            </th>
                            <th style={{ width: '30%', padding: '12px' }}>
                                <Typography
                                    level='title-sm'
                                    sx={{ fontWeight: 'lg' }}
                                >
                                    Location
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.map((doctor) => (
                            <tr key={doctor.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/doctors/${doctor.id}`)}>
                                <td>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar size='lg' variant='soft'>
                                            {doctor.avatar}
                                        </Avatar>
                                        <Typography
                                            level='body-sm'
                                            sx={{ fontWeight: 'md' }}
                                        >
                                            {doctor.fullname}
                                        </Typography>
                                    </Box>
                                </td>
                                <td>
                                    <Typography level='body-sm'>
                                        {formatSpeciality(doctor.speciality)}
                                    </Typography>
                                </td>
                                <td>
                                    <Chip
                                        variant='soft'
                                        size='sm'
                                        color={
                                            getLocationColor(doctor.officelocation) as
                                                | 'primary'
                                                | 'success'
                                                | 'warning'
                                                | 'neutral'
                                        }
                                    >
                                        {doctor.officelocation}
                                    </Chip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                )}
            </Sheet>
        </Box>
    );
});
