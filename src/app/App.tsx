import { Box, CssBaseline, CssVarsProvider } from "@mui/joy";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function App() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                <Sidebar />
                <Box
                    component="main"
                    className="MainContent"
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
                    }}
                >
                    <Header />
                    <Outlet />
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
