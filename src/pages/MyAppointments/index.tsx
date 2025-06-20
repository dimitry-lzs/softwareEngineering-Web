import { Box, Stack } from "@mui/joy";
import UpcomingAppointments from "../../components/UpcomingAppointments";
import SectionTitle from "../../components/SectionTitle";
import React from "react";

export default function MyAppointments() {

    return (
        <React.Fragment>
            <SectionTitle title='My Appointments' subtitle='Check all your upcoming appointments' />
            <Box sx={{ flex: 1, width: '100%' }}>
                <Stack
                    spacing={2}
                    sx={{
                        flexWrap: 'wrap',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                        alignItems: "stretch"
                    }}
                >
                    <Box sx={{ flexGrow: 1, flexShrink: 0, minWidth: "300px", overflowY: 'auto', overflowX: 'hidden' }}>
                        <UpcomingAppointments />
                    </Box>
                </Stack>
            </Box>
        </React.Fragment>
    );
}