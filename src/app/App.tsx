import { Box, CssBaseline, CssVarsProvider } from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Notification from '../components/Notification';
import Sidebar from '../components/Sidebar';
import 'dayjs/locale/en';

export default observer(function App() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <Notification />
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar />
                <Box
                    component='main'
                    className='MainContent'
                    sx={{
                        px: { xs: 2, md: 6 },
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                        },
                        pb: { xs: 2, sm: 2, md: 3 },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                        overflow: 'auto'
                    }}
                >
                    <Header />
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale='en'
                    >
                        <Outlet />
                    </LocalizationProvider>
                </Box>
            </Box>
        </CssVarsProvider>
    );
});
