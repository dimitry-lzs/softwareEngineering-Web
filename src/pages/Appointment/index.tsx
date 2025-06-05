import { Box, Button, Card, Sheet, Typography } from "@mui/joy";
import { useNavigate, useParams } from "react-router";
import { useAppointment, useCancelAppointment } from "../../hooks";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Appointment() {
    const { id } = useParams<{ id: string }>();

    const { appointment, loading, fetchAppointment } = useAppointment(id);
    const navigate = useNavigate();

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
                            <Typography>Doctor:{appointment.doctor.fullName}</Typography>
                            <Typography>Date: {appointment.slot.timeFrom.getDate()}</Typography>
                            <Typography>Time: {appointment.slot.timeFrom.getTime()}</Typography>
                            <Typography>Doctor's Phone: {appointment.doctor.phone}</Typography>
                            <Typography>Doctor's Email: {appointment.doctor.email}</Typography>
                            <Typography>Status: {appointment.status}</Typography>
                            <Typography>Reason: {appointment.reason}</Typography>
                        </Box>
                    )}
                    {appointment?.status !== 'COMPLETED' && appointment?.status !== 'CANCELLED' && appointment && (
                        <Button
                            variant="soft"
                            color="danger"
                            startDecorator={<RemoveCircleOutlineIcon />}
                            onClick={() => {
                                useCancelAppointment(appointment.appointmentid.toString())
                                fetchAppointment(appointment.appointmentid.toString())
                            }}
                        >
                            Cancel Appointment
                        </Button>
                    )}
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