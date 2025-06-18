import { AspectRatio, Avatar, Box, Button, Card, CardActions, CardOverflow, Chip, ColorPaletteProp, Divider, FormControl, FormLabel, Sheet, Stack, Textarea, Typography } from "@mui/joy";
import { useNavigate, useParams } from "react-router";
import { useAppointment, useCancelAppointment } from "../../hooks";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SectionTitle from "../../components/SectionTitle";

export default function Appointment() {
    const { id } = useParams<{ id: string }>();

    const { appointment, loading, fetchAppointment } = useAppointment(id);
    const { cancelAppointment } = useCancelAppointment();
    const navigate = useNavigate();

    const handleCancelAppointment = async () => {
        if (id) {
            try {
                await cancelAppointment(id);
                fetchAppointment(id); // Refresh appointment details after cancellation
            } catch (error) {
                console.error("Failed to cancel appointment:", error);
            }
        }
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>

            <SectionTitle title="Appointment Details" subtitle="View appointment details and diagnosis information" />
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
                            Appointment ID - {id}
                        </Typography>
                    </Box>

                    <Divider />

                    {loading && <Typography>Loading...</Typography>}
                    {appointment && (

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
                                        <FormLabel>Doctor</FormLabel>
                                        <Typography level="body-sm">{appointment.doctor_name}</Typography>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Specialty</FormLabel>
                                        <Typography>{appointment.doctor_specialty}</Typography>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Date</FormLabel>
                                        <Typography level="body-sm">
                                            {new Date(appointment.slot_timeFrom).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </Typography>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Time</FormLabel>
                                        <Typography level="body-sm">
                                            {new Date(appointment.slot_timeFrom).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </Typography>
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Reason</FormLabel>
                                        <Typography level="body-sm">{appointment.reason}</Typography>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Status</FormLabel>

                                        <Chip
                                            variant="soft"
                                            size="sm"
                                            startDecorator={
                                                {
                                                    COMPLETED: <CheckRoundedIcon />,
                                                    CANCELLED: <BlockIcon />,
                                                    PENDING: <HourglassEmptyIcon />,
                                                }[appointment.status]
                                            }
                                            color={
                                                {
                                                    COMPLETED: 'success',
                                                    CANCELLED: 'danger',
                                                    PENDING: 'warning',
                                                }[appointment.status] as ColorPaletteProp
                                            }
                                        >
                                            {appointment.status}
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
                                                <Avatar size="lg" sx={{ width: '100%', height: '100%' }}>
                                                    {
                                                        appointment?.doctor_avatar ? (
                                                            <img alt="" src={appointment.doctor_avatar} />
                                                        ) : (
                                                            appointment.doctor_name ? appointment.doctor_name.slice(0, 1) : '?'
                                                        )
                                                    }
                                                </Avatar>
                                            </AspectRatio>
                                        </Stack>

                                        <FormControl>
                                            <FormLabel>Phone</FormLabel>
                                            <Typography level="body-sm">{appointment.doctor_phone}</Typography>
                                        </FormControl>

                                        <FormControl>
                                            <FormLabel>Email</FormLabel>
                                            <Typography level="body-sm">{appointment.doctor_email}</Typography>
                                        </FormControl>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Stack>

                    )}
                    {appointment?.status !== 'COMPLETED' && appointment?.status !== 'CANCELLED' && appointment && (
                        <Button
                            variant="soft"
                            color="danger"
                            startDecorator={<RemoveCircleOutlineIcon />}
                            onClick={handleCancelAppointment}
                        >
                            Cancel Appointment
                        </Button>
                    )}

                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="solid"
                                onClick={() => navigate(`/history/${id}/feedback`)}
                                disabled={appointment?.status !== 'COMPLETED'}
                                startDecorator={<CheckRoundedIcon />}
                            >
                                Leave Feedback
                            </Button>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                onClick={() => window.history.back()}
                            >
                                Back
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
                {appointment?.status == 'COMPLETED' && appointment && (
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography level="title-md">Diagnosis: </Typography>
                                <Typography level="title-md" sx={{ fontWeight: 'bolder' }}>
                                    {appointment.diagnosis_decease ?? 'No diagnosis provided.'}
                                </Typography>
                            </Stack>
                        </Box>
                        <Divider />
                        <Stack sx={{ my: 1 }}>
                            <Typography level="title-sm">Diagnosis Details:</Typography>
                            <Textarea
                                size="sm"
                                minRows={4}
                                sx={{ mt: 1.5 }}
                                defaultValue={appointment.diagnosis_details ?? ''}
                            />
                        </Stack>
                    </Card>
                )}
            </Stack>
        </Box>
    );
}