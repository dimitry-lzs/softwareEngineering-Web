import { Box, Button, Card, CardActions, CardOverflow, Divider, FormHelperText, Stack, Textarea, Typography } from "@mui/joy";
import { useNavigate, useParams } from "react-router";
import { useAppointment, useCreateDoctorRating } from "../../hooks";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";
import MaterialRating from "../../components/MaterialRating";
import { notificationStore } from "../../stores";

export default function AppointmentFeedback() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const { appointment, loading } = useAppointment(id);
    const { createRating, loading: creatingRating } = useCreateDoctorRating();
    const [comments, setComments] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    const submitHandler = async () => {
        if (rating === 0) {
            notificationStore.setNotification(
                true,
                'Please provide a rating before submitting.',
                'danger',
            );
            return;
        }
        if (appointment) {
            await createRating({
                appointmentID: appointment.appointmentid as number,
                stars: rating,
                comments,
            }, () => navigate('/history'));
        }
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle title="Feedback" subtitle="Let us know of your experience with our doctors" />
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
                        <Typography level="title-md">Feedback Form</Typography>
                        <Typography level="body-sm">
                            Leave a rating and an optional review for Dr. {appointment?.doctor_name}
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack spacing={2} sx={{ my: 1 }}>
                        <Box sx={{ mt: 1, mb: 2 }}>
                            <MaterialRating
                                value={rating}
                                setValue={setRating}
                                readOnly={false}
                            />
                        </Box>
                        <Textarea
                            size="sm"
                            minRows={10}
                            sx={{ mt: 1.5 }}
                            value={comments}
                            placeholder="Share details of your own personal experience with this doctor"
                            onChange={(e) => setComments(e.target.value)}
                        />
                        <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                            {400 - comments.length} characters remaining
                        </FormHelperText>
                    </Stack>
                    {loading && <Typography>Loading...</Typography>}
                    {appointment && (
                        <Box>
                        </Box>
                    )}
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                onClick={() => window.history.back()}
                            >
                                Back
                            </Button>
                            <Button
                                size="sm"
                                variant="solid"
                                color="primary"
                                onClick={submitHandler}
                                loading={creatingRating}
                            >
                                Submit
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box >
    );
}