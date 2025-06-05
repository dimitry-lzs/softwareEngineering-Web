import { Box, Button, Sheet, Typography } from "@mui/joy";
import { useParams } from "react-router";
import { useAppointment } from "../../hooks";

export default function AppointmentFeedback() {
    const { id } = useParams<{ id: string }>();

    const { appointment, loading } = useAppointment(id);
    // const { createRating } = useCreateDoctorRating();

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
                <Typography level='h2'>Feedback</Typography>
                <Typography>
                    This page is under construction.
                </Typography>
                <Typography>
                    Leave a feedback for doctor {appointment?.doctor_name} !
                </Typography>
                <Typography>
                    STARS 1-5
                </Typography>
                <Typography>
                    COMMENTS
                </Typography>                    
                {loading && <Typography>Loading...</Typography>}
                {appointment && (
                    <Box>
                    </Box>
                )}
                <Button
                    variant="solid"
                    color="primary"
                >
                    Submit Feedback
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => window.history.back()}
                >
                    Back
                </Button>

            </Sheet>
        </Box>
    );
}