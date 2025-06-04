import { Box, Typography } from '@mui/joy';

export default function SectionTitle({
    title,
    subtitle,
}: { title: string; subtitle: string }) {
    return (
        <Box
            sx={{
                position: 'sticky',
                top: { sm: -100, md: -110 },
                bgcolor: 'background.body',
                zIndex: 9995,
            }}
        >
            <Box sx={{ flex: 1, width: '100%', textAlign: 'left' }}>
                <Typography level='h2' component='h1' sx={{ mt: 1 }}>
                    {title}
                </Typography>
                <Typography level='title-md' sx={{ mb: 2 }}>
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
}
