import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Select, Stack, Typography, Option } from "@mui/joy";
import SectionTitle from "../../../components/SectionTitle";
import React from "react";
import MaterialCalendar from "../../../components/MaterialCalendar";
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

export default function SetAvailabilities() {
    return (

        <React.Fragment>
            <SectionTitle
                title="Set Availabilities"
                subtitle="Choose your open time slots to make scheduling easy for your patients"
            />
            <Box sx={{ px: 4, flex: 1, width: '100%' }}>
                <Stack direction="column" spacing={2} alignItems='center' justifyContent='center'>

                    <Stack direction="row" alignItems='center' justifyContent='center' spacing={2} >

                        <Card variant="outlined">
                            <MaterialCalendar />
                        </Card>

                        <Card >
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-md">Today's Time Slots - Today's Date </Typography>
                                <Typography level="body-sm">
                                    Availability time slots you have set for this day
                                </Typography>
                            </Box>
                            <Divider />

                            <Stack
                                direction="column"
                                divider={<Divider orientation="horizontal" />}
                                spacing={2}
                                sx={{
                                    height: '306px',
                                    display: 'flex',
                                    my: 1,
                                    overflowY: 'auto',
                                    overflowX: 'hidden'
                                }}
                            >
                                <Typography>
                                    bleep
                                </Typography>
                                <Typography>
                                    bleep
                                </Typography>
                                <Typography>
                                    bleep
                                </Typography>
                                <Typography>
                                    bleep
                                </Typography>
                                <Typography>
                                    bleep
                                </Typography>
                                <Typography>
                                    bleep
                                </Typography>
                                <Typography>
                                    bleep
                                </Typography>
                                <Typography>
                                    bleep
                                </Typography>
                            </Stack>
                        </Card>
                    </Stack>
                    <Stack direction='column' alignItems='stretch'>
                    <Card>
                        <Stack direction='column' sx={{ mb: 1 }}>
                            <Typography level="title-md">Add Availabilities</Typography>
                            <Typography level="body-sm">
                                Consult your calendar, select a date and add open time slots to allow patients book an appointment with you
                            </Typography>
                        </Stack>
                        <Divider />
                        <Stack
                            direction="column"
                            display='flex'
                            spacing={2}
                            sx={{ my: 1 }}
                        >
                            <Box sx={{ mb: 1 }}>
                                <Stack spacing={2}>
                                    <FormControl>
                                        <FormLabel>Date</FormLabel>
                                        <Typography level="body-sm">
                                            12 - 06 - 2025
                                        </Typography>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Time</FormLabel>
                                        <Select
                                            size="sm"
                                            startDecorator={<AccessTimeFilledRoundedIcon />}
                                            defaultValue="1"
                                        >
                                            <Option value="1">
                                                <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
                                                    — 07:00
                                                </Typography>
                                            </Option>
                                            <Option value="2">
                                                <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
                                                    — 08:00
                                                </Typography>
                                            </Option>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Box>
                        </Stack>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button size="sm" variant="solid">
                                    Add New
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                    </Stack>
                </Stack>
            </Box>
        </React.Fragment>

    );
}