import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';

import Typography from '@mui/joy/Typography';
import DoctorCard from '../../components/DoctorCard';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';


export default function HomePage() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
          display: 'grid',
          // gridTemplateColumns: { xs: 'auto', md: '60% 40%' },
          // gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <Search />
        <Stack
          sx={{
            backgroundColor: 'background.surface',
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack sx={{ mb: 2 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
              <Typography level="h2">Relevant results according to your search</Typography>
            </Stack>
            <Typography level="body-md" color="neutral">
              Book your next appointment.
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Stack spacing={2} sx={{ overflow: 'auto' }}>
            <DoctorCard
              title="John Shcmoe"
              category="Oncologist"
              rareFind
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Kalos Giatros"
              category="Oncologist"
              liked
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Kakos Giatros"
              category="Entire rental unit in Carlton"
              image="https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Magnificent apartment next to public transport"
              category="Entire apartment rental in Collingwood"
              image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Next to shoppng mall and public transport"
              category="Entire apartment rental in Collingwood"
              image="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Endless ocean view"
              category="A private room in a shared apartment in Docklands"
              image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="A Stylish Apt, 5 min walk to Queen Victoria Market"
              category="one bedroom apartment in Collingwood"
              image="https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=400"
            />
          </Stack>
        </Stack>
        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}
