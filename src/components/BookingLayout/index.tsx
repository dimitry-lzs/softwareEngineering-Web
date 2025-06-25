import * as React from 'react';
import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import SectionTitle from '../SectionTitle';

interface BookingLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

export default function BookingLayout({ title, subtitle, children }: BookingLayoutProps) {
    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle title={title} subtitle={subtitle} />
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                {children}
            </Stack>
        </Box>
    );
}
