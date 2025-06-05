import MaterialCalendar from "../../components/MaterialCalendar";
import { Box, Divider, Stack } from "@mui/joy";
import UpcomingAppointments from "../../components/UpcomingAppointments";
import SectionTitle from "../../components/SectionTitle";
import React from "react";

export default function Calendar() {

    return (
        <React.Fragment>
            <SectionTitle title='Calendar' subtitle='Check all your upcoming appointments' />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // minHeight: '100%',
                    width: '100%',
                    mb: 1,
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    // divider={<Divider
                    //     orientation="vertical"
                    //     sx={{
                    //         height: "auto",
                    //     }}
                    // />}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        flexWrap: 'wrap',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 2,
                    }}
                >
                    <MaterialCalendar />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <UpcomingAppointments />
                    </Box>
                </Stack>
            </Box>
        </React.Fragment>
    );
}