import MaterialCalendar from "../../components/MaterialCalendar";
import { Box, Divider, Stack, Typography } from "@mui/joy";
import UpcomingAppointments from "../../components/UpcomingAppointments";

export default function Calendar() {

    return (
        <Typography level="h2" sx={{ mb: 2 }}
        > Calendar 
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider orientation="vertical" />}
                sx={{ 
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2,
                }}
                // sx={{
                //     justifyContent: "center",
                //     alignItems: "center",
                // }}
            >
                <MaterialCalendar/>
                <UpcomingAppointments/>
                {/* <AppointmentHistory/> */}
            </Stack>
        </Typography>
    );

}
