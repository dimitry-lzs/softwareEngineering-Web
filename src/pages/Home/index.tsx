import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoctorCard from './doctorCard';
import Search from './search';

export default function Home() {
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
              <Typography level="h3">Relevant results according to your search</Typography>
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
              specialty="Oncologist"
              location="Thessaloniki"
              rating={4.5}
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Kakos Giatros"
              specialty="Oncologist"
              location="Athens"
              rating={3.5}
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Giatrara"
              specialty="Dermatologist"
              location="Athens"
              rating={5}
              image="https://images.unsplash.com/photo-1537726235470-8504e3beef77?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Kalos Giatros"
              specialty="Pediatrician"
              location="Patras"
              rating={4.2}
              image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Giatroumpini"
              specialty="Psychiatrist"
              location="Thessaloniki"
              rating={4.5}
              image="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Giatrosn't"
              specialty="Ornithologist"
              location="Patras"
              rating={2.5}
              image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400"
            />
            <DoctorCard
              title="Apla giatros"
              specialty="Cardiologist"
              location="Athens"
              rating={3}
              image="https://images.unsplash.com/photo-1481437156560-3205f6a55735?auto=format&fit=crop&w=400"
            />
          </Stack>
        </Stack>
        {/* <Box
            className="Pagination-laptopUp"
            sx={{
            pt: 2,
            gap: 1,
            [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
            display: {
                xs: 'none',
                md: 'flex',
            },
            }}
        >
            <Button
            size="sm"
            variant="outlined"
            color="neutral"
            startDecorator={<KeyboardArrowLeftIcon />}
            >
            Previous
            </Button>
    
            <Box sx={{ flex: 1 }} />
            {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
            <IconButton
                key={page}
                size="sm"
                variant={Number(page) ? 'outlined' : 'plain'}
                color="neutral"
            >
                {page}
            </IconButton>
            ))}
            <Box sx={{ flex: 1 }} />
            <Button
            size="sm"
            variant="outlined"
            color="neutral"
            endDecorator={<KeyboardArrowRightIcon />}
            >
            Next
            </Button>
        </Box> */}
        <div>
          <Box
            className="Pagination-mobile"
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              mx: 2,
              my: 1,
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
