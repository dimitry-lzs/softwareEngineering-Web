import { Box, Button, Card, CardActions, CardOverflow, Checkbox, Chip, Divider, Stack, Textarea, Typography } from "@mui/joy";
import SectionTitle from "../../components/SectionTitle";
import { useDoctorAvailability } from "../../hooks/availability";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router";

export default function ViewDetails({
    id,
    setPage,
}: {
    id: string;
    setPage: (page: number) => void;
}) {

    const { availabilities } = useDoctorAvailability(id);
    const [selected, setSelected] = useState<number | null>(null);
    const [reason, setReason] = useState<string>('');
    const navigate = useNavigate();

    const submitHandler = async () => {
        console.log('Submitting appointment with reason:', reason, 'and selected availability:', selected);
    }

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle title="Book Appointment" subtitle="Book your appointment!" />
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
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
                            Book an appointment by selecting on of the available times and dates
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
                        overflowX: 'hidden', // Enable horizontal scrolling
                        overflowY: 'auto', // Prevent tabs from wrapping
                    }}
                    >
                        <div>
                            <Box
                                role="group"
                                aria-labelledby="available-time-slot"
                                sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
                            >
                                {availabilities?.map((availability) => {
                                    const dateObj = new Date(availability.timefrom);
                                    const formattedDate = dateObj.toLocaleDateString('en-CA'); // e.g. 2024-06-10
                                    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // e.g. 14:30

                                    const checked = selected === availability.availabilityid ? true : false;
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
                                                    setSelected(checked ? null : availability.availabilityid);
                                                }}
                                            />
                                        </Chip>
                                    );
                                })}
                            </Box>
                        </div>
                    </Box>
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                onClick={() => {
                                    setPage(1);
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                size="sm"
                                variant="solid"
                            onClick={submitHandler}
                            >
                                Book Appointment
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box>
    );
}