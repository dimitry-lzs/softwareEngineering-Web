import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import { OfficeLocation } from '../../types';
import { useDoctors } from '../../hooks';


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

export default function Doctors() {
    const { doctors, loading } = useDoctors(); // Assuming useDoctors is a custom hook that fetches doctors data
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
                        {doctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar size='sm' variant='soft'>
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
            </Sheet>
        </Box>
    );
}
