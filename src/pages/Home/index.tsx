import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import DoctorCard from './doctorCard';
import Search from './search';
import SectionTitle from '../../components/SectionTitle';
import { useDoctors } from '../../hooks';
import { useMemo, useState } from 'react';

export default function Home() {

    const { doctors } = useDoctors();
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
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto'
                }}
            >
                <SectionTitle title="Home" subtitle="Search for doctors in your area" />

                <Search
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    selectedSpeciality={selectedSpeciality}
                    setSelectedSpeciality={setSelectedSpeciality}
                />

                <Box sx={{ flex: 1, overflow: 'auto' }}>
                    <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor.id}
                                    id={doctor.id}
                                    title={`${doctor.fullname}`}
                                    specialty={doctor.speciality}
                                    location={doctor.officelocation}
                                    rating={doctor.rating}
                                    image={doctor.avatar}
                                />
                            ))
                        ) : (
                            <Box sx={{
                                textAlign: 'center',
                                py: 8,
                                color: 'text.secondary'
                            }}>
                                <Typography level="body-lg">
                                    No doctors found matching your criteria
                                </Typography>
                                <Typography level="body-sm" sx={{ mt: 1 }}>
                                    Try adjusting your search filters
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
