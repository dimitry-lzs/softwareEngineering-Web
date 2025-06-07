import { Box, Button, Card, CardActions, CardOverflow, Divider, FormHelperText, Sheet, Stack, Textarea, Typography } from "@mui/joy";
import { useParams } from "react-router";
import { useAppointment } from "../../hooks";
import SectionTitle from "../../components/SectionTitle";
import Rating from "../Home/rating";

export default function AppointmentFeedback() {
    const { id } = useParams<{ id: string }>();

    const { appointment, loading } = useAppointment(id);
    // const { createRating } = useCreateDoctorRating();

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
                            <Rating rating={4} />
                        </Box>
                        <Textarea
                            size="sm"
                            minRows={10}
                            sx={{ mt: 1.5 }}
                            placeholder="Share details of your own personal experience with this doctor"
                        />
                        <FormHelperText sx={{ mt: 0.75, fontSize: 'xs' }}>
                            400 characters left
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
                            <Button size="sm" variant="solid" color="primary">
                                Submit
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box >
    );
}