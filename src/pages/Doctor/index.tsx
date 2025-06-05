import { Box, Sheet, Typography } from "@mui/joy";
import { useParams } from "react-router";
import { useDoctor, useDoctorRatings } from "../../hooks";

export default function Doctor() {
    const { id } = useParams<{ id: string }>();

    const { doctor, loading } = useDoctor(id);
    const { ratings, loading: ratingsLoading } = useDoctorRatings(id);

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
                <Typography level='h2'>Doctor Details</Typography>
                <Typography>
                    This page is under construction.
                </Typography>
                <Typography>
                    Doctor ID: {id}
                </Typography>
                {loading && <Typography>Loading...</Typography>}
                {doctor && (
                    <Box>
                        <Typography level='h3'>{doctor.fullname}</Typography>
                        <Typography>Speciality: {doctor.speciality}</Typography>
                        <Typography>Location: {doctor.officelocation}</Typography>
                        <Typography>Phone: {doctor.phone}</Typography>
                        <Typography>Email: {doctor.email}</Typography>
                    </Box>
                )}
                {ratingsLoading && <Typography>Loading ratings...</Typography>}
                {ratings && ratings.length > 0 && (
                    <Box>
                        <Typography level='h4'>Ratings</Typography>
                        {ratings.map((rating) => (
                            <Box key={rating.comments} sx={{ mb: 2 }}>
                                <Typography>Rating: {rating.stars}</Typography>
                                <Typography>Comment: {rating.comments}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Sheet>
        </Box>
    );
}