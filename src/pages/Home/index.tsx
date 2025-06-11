import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import DoctorCard from './doctorCard';
import Search from './search';
import SectionTitle from '../../components/SectionTitle';
import { useDoctors } from '../../hooks';
import { useEffect, useMemo, useState } from 'react';

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
          display: 'grid',
        }}
      >
        <SectionTitle title="Home" subtitle="Search for doctors in your area" />

        <Search
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedSpeciality={selectedSpeciality}
          setSelectedSpeciality={setSelectedSpeciality}
        />

        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 } }}>
          <Stack spacing={2} sx={{ overflowY: 'auto', overflowX: 'hidden', height: '450px' }}>
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                id={doctor.id}
                title={`${doctor.fullname}`}
                specialty={doctor.speciality}
                location={doctor.officelocation}
                rating={doctor.rating}
                image={doctor.avatar}
              />
            ))}
          </Stack>
        </Stack>
        <div>
          <Box
            className="Pagination-mobile"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              mx: 2,
              my: 1,
              mb: 4,
              mt: 4
            }}
          >
            <IconButton
              aria-label="previous page"
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <Typography level="body-sm" sx={{ mx: 'auto' }}>
              Page 1 of 10
            </Typography>
            <IconButton
              aria-label="next page"
              variant="outlined"
              color="neutral"
              size="sm"
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Box>
          <Box
            className="Pagination-laptopUp"
            sx={{
              gap: 1,
              [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
              display: {
                xs: 'none',
                md: 'flex',
              },
              mx: 4,
              my: 2,
            }}
          >
            <Button
              size="sm"
              variant="plain"
              color="neutral"
              startDecorator={<ArrowBackIosRoundedIcon />}
            >
              Previous
            </Button>

            <Box sx={{ flex: 1 }} />
            {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
              <IconButton
                key={page}
                size="sm"
                variant={Number(page) ? 'plain' : 'soft'}
                color="neutral"
              >
                {page}
              </IconButton>
            ))}
            <Box sx={{ flex: 1 }} />

            <Button
              size="sm"
              variant="plain"
              color="neutral"
              endDecorator={<ArrowForwardIosRoundedIcon />}
            >
              Next
            </Button>
          </Box>
        </div>
      </Box>
    </CssVarsProvider>
  );
}
