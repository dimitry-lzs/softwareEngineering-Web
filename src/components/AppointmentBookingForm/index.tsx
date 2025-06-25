import { Box, Checkbox, Chip, Divider, Textarea, Typography, Card, CardActions, CardOverflow } from "@mui/joy";
import CheckIcon from '@mui/icons-material/Check';
import { useDoctorAvailability } from "../../hooks/availability";
import { LowercaseType } from '../../hooks/lowercase';
import { Availability } from '../../types';

interface AppointmentBookingFormProps {
    doctorId: string;
    reason: string;
    setReason: (reason: string) => void;
    selectedSlot: number | null;
    setSelectedSlot: (slot: number | null) => void;
    actions?: React.ReactNode;
}

export default function AppointmentBookingForm({
    doctorId,
    reason,
    setReason,
    selectedSlot,
    setSelectedSlot,
    actions,
}: AppointmentBookingFormProps) {
    const { availabilities } = useDoctorAvailability(doctorId);

    return (
        <>
            <Card>
                <Box sx={{ mb: 0.5 }}>
                    <Typography level="title-md">Reason</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                    <Typography level="body-sm">Reason for Appointment</Typography>
                    <Textarea
                        minRows={3}
                        placeholder="Enter the reason for your appointment (optional)"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Box>
            </Card>
            <Card>
                <Box sx={{ mb: 1 }}>
                    <Typography level="title-md">Available Appointments</Typography>
                    <Typography level="body-sm">
                        Book an appointment by selecting one of the available times and dates
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    mb: 1,
                    ml: 0.5,
                    height: '250px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
                >
                    <div>
                        <Box
                            role="group"
                            aria-labelledby="available-time-slot"
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
                        >
                            {availabilities?.map((availability: LowercaseType<Availability>) => {
                                const dateObj = new Date(availability.timefrom);
                                const formattedDate = dateObj.toLocaleDateString('en-CA');
                                const formattedTime = dateObj.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                });

                                const checked = selectedSlot === availability.availabilityid;
                                return (
                                    <Chip
                                        key={availability.availabilityid}
                                        variant="plain"
                                        color={checked ? 'primary' : 'neutral'}
                                        startDecorator={
                                            checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                                        }
                                    >
                                        <Checkbox
                                            variant="outlined"
                                            color={checked ? 'primary' : 'neutral'}
                                            disableIcon
                                            overlay
                                            label={`${formattedDate} ${formattedTime}`}
                                            checked={checked}
                                            onChange={() => {
                                                setSelectedSlot(checked ? null : availability.availabilityid);
                                            }}
                                        />
                                    </Chip>
                                );
                            })}
                        </Box>
                    </div>
                </Box>
                {actions && (
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            {actions}
                        </CardActions>
                    </CardOverflow>
                )}
            </Card>
        </>
    );
}
