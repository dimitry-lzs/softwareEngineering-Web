import { AspectRatio, Box, Button, Card, CardActions, CardOverflow, Chip, Divider, FormControl, FormLabel, Stack, Textarea, Typography } from "@mui/joy";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


import SectionTitle from "../../../components/SectionTitle";


export default function DoctorAppointment() {
    return (
        <Box sx={{ flex: 1, width: '100%' }}>

            <SectionTitle title="Appointment Details" subtitle="View appointment details and manage diagnosis information" />

            {/* ---------- APPOINTMENT DETAILS CARD IF APPOINTMENT IS PENDING -------------*/}

            <Stack
                spacing={2}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">
                            Appointment ID - id
                        </Typography>
                    </Box>

                    <Divider />

                    <Stack>
                        <Stack
                            direction="row"
                            spacing={4}
                            sx={{ display: 'flex', my: 1 }}
                        >
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{
                                    px: { xs: 1, md: 2 },
                                    py: { xs: 1, md: 2 },
                                }}
                            >
                                <FormControl>
                                    <FormLabel>Patient</FormLabel>
                                    <Typography level="body-sm">Poli arrostos</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                    <Typography level="body-sm">13-06-2025</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Time</FormLabel>
                                    <Typography level="body-sm">15:00</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Reason</FormLabel>
                                    <Typography level="body-sm">bldhkkkkkkffajbajfiFHRJBFDJA</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>

                                    <Chip
                                        variant="soft"
                                        size="sm"
                                    // startDecorator={
                                    //     {
                                    //         COMPLETED: <CheckRoundedIcon />,
                                    //         CANCELLED: <BlockIcon />,
                                    //         PENDING: <HourglassEmptyIcon />,
                                    //     }[appointment.status]
                                    // }
                                    // color={
                                    //     {
                                    //         COMPLETED: 'success',
                                    //         CANCELLED: 'danger',
                                    //         PENDING: 'warning',
                                    //     }[appointment.status] as ColorPaletteProp
                                    // }
                                    >
                                        PENDING
                                    </Chip>

                                </FormControl>

                            </Stack>

                            <Divider orientation="vertical" />
                            <Box
                                sx={{ mx: 4 }}
                            >
                                <Stack
                                    direction="column"
                                    spacing={2}
                                    sx={{ mx: 4 }}
                                >
                                    <Typography level="title-sm">Contact Information</Typography>

                                    <Stack>
                                        <AspectRatio
                                            ratio="1"
                                            maxHeight={200}
                                            sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                                        >
                                            <img
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                                srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                                loading="lazy"
                                                alt=""
                                            />
                                        </AspectRatio>
                                    </Stack>

                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Typography level="body-sm">6942099666</Typography>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <Typography level="body-sm">email@papakitelia.com</Typography>
                                    </FormControl>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>


                    {/* {appointment?.status !== 'COMPLETED' && appointment?.status !== 'CANCELLED' && appointment && ( */}
                    <Button
                        variant="soft"
                        color="danger"
                        startDecorator={<RemoveCircleOutlineIcon />}
                    // onClick={handleCancelAppointment}
                    >
                        Cancel Appointment
                    </Button>
                    {/* )} */}

                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                            // onClick={() => window.history.back()}
                            >
                                Back
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
                {/* )} */}
            </Stack>


            {/*---------- APPOINTMENT CARD IF APPOINTMENT WAS COMPLETED --------------*/}
            <Stack
                spacing={2}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">
                            Appointment ID - id
                        </Typography>
                    </Box>

                    <Divider />

                    <Stack>
                        <Stack
                            direction="row"
                            spacing={4}
                            sx={{ display: 'flex', my: 1 }}
                        >
                            <Stack
                                direction="column"
                                spacing={2}
                                sx={{
                                    px: { xs: 1, md: 2 },
                                    py: { xs: 1, md: 2 },
                                }}
                            >
                                <FormControl>
                                    <FormLabel>Patient</FormLabel>
                                    <Typography level="body-sm">Poli arrostos</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Date</FormLabel>
                                    <Typography level="body-sm">13-06-2025</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Time</FormLabel>
                                    <Typography level="body-sm">15:00</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Reason</FormLabel>
                                    <Typography level="body-sm">bldhkkkkkkffajbajfiFHRJBFDJA</Typography>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Status</FormLabel>

                                    <Chip
                                        variant="soft"
                                        size="sm"
                                    // startDecorator={
                                    //     {
                                    //         COMPLETED: <CheckRoundedIcon />,
                                    //         CANCELLED: <BlockIcon />,
                                    //         PENDING: <HourglassEmptyIcon />,
                                    //     }[appointment.status]
                                    // }
                                    // color={
                                    //     {
                                    //         COMPLETED: 'success',
                                    //         CANCELLED: 'danger',
                                    //         PENDING: 'warning',
                                    //     }[appointment.status] as ColorPaletteProp
                                    // }
                                    >
                                        PENDING
                                    </Chip>

                                </FormControl>

                            </Stack>

                            <Divider orientation="vertical" />
                            <Box
                                sx={{ mx: 4 }}
                            >
                                <Stack
                                    direction="column"
                                    spacing={2}
                                    sx={{ mx: 4 }}
                                >
                                    <Typography level="title-sm">Contact Information</Typography>

                                    <Stack>
                                        <AspectRatio
                                            ratio="1"
                                            maxHeight={200}
                                            sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                                        >
                                            <img
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                                srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                                loading="lazy"
                                                alt=""
                                            />
                                        </AspectRatio>
                                    </Stack>

                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Typography level="body-sm">6942099666</Typography>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                        <Typography level="body-sm">email@papakitelia.com</Typography>
                                    </FormControl>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="solid"
                                // onClick={() => navigate(`/history/${id}/feedback`)}
                                // disabled={appointment?.status !== 'COMPLETED'}
                                startDecorator={<CheckRoundedIcon />}
                            >
                                Add Diagnosis
                            </Button>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                            // onClick={() => window.history.back()}
                            >
                                Back
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
                {/* {appointment?.status == 'COMPLETED' && appointment && ( */}
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography level="title-md">Diagnosis </Typography>
                            <Typography level="title-md" sx={{ fontWeight: 'bolder' }}>
                                {/* {appointment.diagnosis_decease ?? 'No diagnosis provided.'} */}
                            </Typography>
                        </Stack>
                    </Box>
                    <Divider />
                    <Stack sx={{ my: 1 }}>
                        <Typography level="title-sm">Diagnosis Details</Typography>
                        <Textarea
                            size="sm"
                            minRows={4}
                            sx={{
                                mt: 1.5,
                                overflowX: 'hidden',
                                overflowY: 'auto'
                            }}
                        // defaultValue={appointment.diagnosis_details ?? ''}
                        />
                    </Stack>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="solid"
                                // onClick={() => navigate(`/history/${id}/feedback`)}
                                // disabled={appointment?.status !== 'COMPLETED'}
                                startDecorator={<CheckRoundedIcon />}
                            >
                                Save
                            </Button>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                            // onClick={() => window.history.back()}
                            >
                                Edit
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
                {/* )} */}
            </Stack>

        </Box>
    );
}