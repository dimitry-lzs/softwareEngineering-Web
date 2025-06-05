import MaterialCalendar from "../../components/MaterialCalendar";
import { Box, Divider, Stack, Typography } from "@mui/joy";
import UpcomingAppointments from "../../components/UpcomingAppointments";

export default function Calendar() {

    return (
        <Typography level="h2" sx={{ mb: 2 }}
        > Calendar 
            <Box
                sx={{ 
                      display: 'flex',
                      //direction: 'row',
                      //minWidth: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '100%',
                      flexWrap: 'wrap',
                      marginTop: 2
                      //padding: 1,
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    divider={<Divider 
                                orientation="vertical" 
                                sx={{
                                    height: "auto", // Allow the divider to stretch dynamically
                                    //alignSelf: "stretch", // Stretch the divider to match sibling height
                                }}
                            />}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        gap: 4,
                    }}
                >
                    <MaterialCalendar/>

                    <Box 
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                        }}
                    >
                        <UpcomingAppointments/>
                    </Box>
                </Stack>
            </Box>
        </Typography>       
    );  
}
