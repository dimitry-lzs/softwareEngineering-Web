import { Box, Button, Card, Stack, Typography } from '@mui/joy';
import { useNavigate, useRouteError } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function ErrorPage() {
    const error = useRouteError() as any;
    const navigate = useNavigate();

    const getErrorInfo = () => {
        if (error?.status === 404) {
            return {
                title: '404 - Page Not Found',
                message: 'The page you are looking for does not exist or has been moved.',
                icon: <SearchOffIcon sx={{ fontSize: 80, color: 'neutral.400' }} />,
            };
        }

        return {
            title: 'Oops! Something went wrong',
            message: error?.message || 'An unexpected error occurred. Please try again later.',
            icon: <ErrorOutlineIcon sx={{ fontSize: 80, color: 'danger.400' }} />,
        };
    };

    const { title, message, icon } = getErrorInfo();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
                py: 4,
                background: 'linear-gradient(135deg, var(--joy-palette-background-level1) 0%, var(--joy-palette-background-surface) 100%)',
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    textAlign: 'center',
                    p: 4,
                    boxShadow: 'lg',
                    borderRadius: 'lg',
                }}
            >
                <Stack spacing={3} alignItems="center">
                    {/* Error Icon */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: '50%',
                            bgcolor: 'background.level1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </Box>

                    {/* Error Title */}
                    <Typography level="h2" component="h1" color="danger">
                        {title}
                    </Typography>

                    {/* Error Message */}
                    <Typography level="body-md" color="neutral" sx={{ textAlign: 'center', maxWidth: 400 }}>
                        {message}
                    </Typography>

                    {/* Action Buttons */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3, width: '100%' }}>
                        <Button
                            size="lg"
                            variant="solid"
                            startDecorator={<HomeRoundedIcon />}
                            onClick={() => navigate('/')}
                            sx={{ flex: 1 }}
                        >
                            Go Home
                        </Button>
                        <Button
                            size="lg"
                            variant="outlined"
                            startDecorator={<ArrowBackIcon />}
                            onClick={() => window.history.back()}
                            sx={{ flex: 1 }}
                        >
                            Go Back
                        </Button>
                    </Stack>

                    {/* Additional Help Text */}
                    <Typography level="body-sm" color="neutral" sx={{ mt: 2 }}>
                        If you continue to experience issues, please contact support.
                    </Typography>
                </Stack>
            </Card>

            {/* Background Decoration */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: 'primary.100',
                    opacity: 0.1,
                    zIndex: -1,
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'warning.200',
                    opacity: 0.1,
                    zIndex: -1,
                }}
            />
        </Box>
    );
}
