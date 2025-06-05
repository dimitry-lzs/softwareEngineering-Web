import { Box, Button, Card, Chip, ColorPaletteProp, Divider, Sheet, Typography } from "@mui/joy";
import { useNavigate, useParams } from "react-router";
import { useAppointment, useCancelAppointment } from "../../hooks";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

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
            <Sheet
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                }}
            >
                <Typography level='h2'>Appointment Details</Typography>
                <Typography>
                    This page is under construction. :3
                </Typography>
                <Card sx={{ minWidth: 620 }}>
                    <Typography level="h3" sx={{ mb: 1 }}>
                        Appointment ID: {id}
                    </Typography>
                    {loading && <Typography>Loading...</Typography>}
                    {appointment && (
                        <Box>
                            <Typography>Doctor: {appointment.doctor_name}</Typography>
                            <Typography>Date:
                                {new Date(appointment.slot_timefrom).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                            </Typography>
                            <Typography>Time:
                                {new Date(appointment.slot_timefrom).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                })}
                            </Typography>
                            <Typography>Specialty: {appointment.doctor_specialty}</Typography>
                            <Typography>Reason: {appointment.reason}</Typography>
                            <Typography>Status:
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
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography>Doctor's Phone: {appointment.doctor_phone}</Typography>
                            <Typography>Doctor's Email: {appointment.doctor_email}</Typography>
                        </Box>
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
                    <Button
                        variant="solid"
                        onClick={() => navigate(`/history/${id}/feedback`)}
                        disabled={appointment?.status !== 'COMPLETED'}
                        startDecorator={<CheckRoundedIcon />}
                    >
                        Leave Feedback
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/history`)}
                    >
                        Back
                    </Button>
                </Card>
            </Sheet>
        </Box>
    );
}