import { Box, Button, Card, CardActions, CardOverflow, Chip, ColorPaletteProp, Divider, FormControl, FormLabel, Stack, Textarea, Typography } from "@mui/joy";
import SmartAvatar from '../../components/SmartAvatar';
import { useParams } from "react-router";
import { useAppointment, useCancelAppointment, useCreateDoctorRating, useAppointmentRating, useUpdateRating } from "../../hooks";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import EditIcon from '@mui/icons-material/Edit';
import SectionTitle from "../../components/SectionTitle";
import MaterialRating from "../../components/MaterialRating";
import { useState, useEffect, useMemo } from "react";
import { Rating } from "../../types";
import { LowercaseType } from "../../hooks/lowercase";

export default function Appointment() {
    const { id } = useParams<{ id: string }>();

    const { appointment, loading, fetchAppointment } = useAppointment(id);
    const { cancelAppointment } = useCancelAppointment();
    const { rating, fetchRating } = useAppointmentRating(id);
    const { updateRating, loading: updateLoading } = useUpdateRating();
    const { createRating, loading: createLoading } = useCreateDoctorRating();

    const [editingRating, setEditingRating] = useState(false);
    const [ratingStars, setRatingStars] = useState(0);
    const [ratingComments, setRatingComments] = useState('');
    const [updatedRating, setUpdatedRating] = useState<LowercaseType<Rating> | null>(null);

    useEffect(() => {
        if (rating) {
            setRatingStars(rating.stars);
            setRatingComments(rating.comments);
        } else {
            setRatingStars(0);
            setRatingComments('');
        }
    }, [rating]);

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

    const appointmentRating = useMemo(() => {
        if (updatedRating) return updatedRating;
        if (rating) return rating;
        return null;
    }, [updatedRating, rating]);

    const handleSaveRating = async () => {
        if (!id || ratingStars === 0) return;
        if (rating) {
            const newRating = await updateRating(id, ratingStars, ratingComments);
            setUpdatedRating(newRating);
            setEditingRating(false);
        } else {
            // Create new rating
            if (appointment) {
                await createRating({
                    appointmentID: appointment.appointmentid!,
                    stars: ratingStars,
                    comments: ratingComments,
                }, () => {
                    // Refresh rating after creation
                    fetchRating(id);
                    setEditingRating(false);
                });
            }
        }
    };

    const handleCancelEdit = () => {
        if (rating) {
            setRatingStars(rating.stars);
            setRatingComments(rating.comments);
        } else {
            setRatingStars(0);
            setRatingComments('');
        }
        setEditingRating(false);
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>

            <SectionTitle title="Appointment Details" subtitle="View appointment details and diagnosis information" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
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
                                            {new Date(appointment.slot_timefrom).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                            })}
                                        </Typography>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Time</FormLabel>
                                        <Typography level="body-sm">
                                            {new Date(appointment.slot_timefrom).toLocaleTimeString('en-US', {
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
                                            <Box sx={{
                                                width: 150,
                                                height: 150,
                                                mx: 'auto',
                                                borderRadius: '8px',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                alignItems: 'stretch'
                                            }}>
                                                <SmartAvatar
                                                    src={appointment?.doctor_avatar}
                                                    name={appointment.doctor_name || 'Unknown Doctor'}
                                                    size="lg"
                                                    sx={{ width: '100%', height: '100%' }}
                                                />
                                            </Box>
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
                                variant="outlined"
                                color="neutral"
                                onClick={() => window.history.back()}
                            >
                                Back
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>

                {/* Rating Section - Only show for completed appointments */}
                {appointment?.status === 'COMPLETED' && (
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                                <Typography level="title-md">
                                    {appointmentRating ? 'Your Rating' : 'Rate Your Experience'}
                                </Typography>
                                {appointmentRating && !editingRating && (
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        startDecorator={<EditIcon />}
                                        onClick={() => setEditingRating(true)}
                                    >
                                        Edit Rating
                                    </Button>
                                )}
                            </Stack>
                            <Typography level="body-sm">
                                {appointmentRating ? 'Your rating for Dr. ' + appointment?.doctor_name : 'Rate your experience with Dr. ' + appointment?.doctor_name}
                            </Typography>
                        </Box>
                        <Divider />
                        {!appointmentRating && !editingRating ? (
                            <Stack spacing={2} sx={{ my: 2 }}>
                                <Box>
                                    <Typography level="body-sm" sx={{ mb: 1 }}>Rating:</Typography>
                                    <MaterialRating
                                        value={ratingStars}
                                        setValue={setRatingStars}
                                        readOnly={false}
                                    />
                                </Box>
                                <FormControl>
                                    <FormLabel>Comments (optional)</FormLabel>
                                    <Textarea
                                        value={ratingComments}
                                        onChange={(e) => setRatingComments(e.target.value)}
                                        placeholder="Share your experience with this doctor..."
                                        minRows={3}
                                    />
                                </FormControl>
                                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        onClick={handleSaveRating}
                                        disabled={ratingStars === 0}
                                        loading={createLoading}
                                    >
                                        Submit Rating
                                    </Button>
                                </Stack>
                            </Stack>
                        ) : appointmentRating && !editingRating ? (
                            // Display existing rating
                            <Stack spacing={2} sx={{ my: 2 }}>
                                <Box>
                                    <Typography level="body-sm" sx={{ mb: 1 }}>Your Rating:</Typography>
                                    <MaterialRating
                                        value={appointmentRating.stars}
                                        setValue={() => { }} // Read-only
                                        readOnly={true}
                                    />
                                </Box>
                                {appointmentRating.comments && (
                                    <FormControl>
                                        <FormLabel>Your Comments:</FormLabel>
                                        <Box sx={{
                                            p: 1.5,
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            border: '1px solid',
                                            borderColor: 'divider'
                                        }}>
                                            <Typography level="body-sm">
                                                {appointmentRating.comments}
                                            </Typography>
                                        </Box>
                                    </FormControl>
                                )}
                            </Stack>
                        ) : (
                            // Edit rating form
                            <Stack spacing={2} sx={{ my: 2 }}>
                                <Box>
                                    <Typography level="body-sm" sx={{ mb: 1 }}>Rating:</Typography>
                                    <MaterialRating
                                        value={ratingStars}
                                        setValue={setRatingStars}
                                        readOnly={false}
                                    />
                                </Box>
                                <FormControl>
                                    <FormLabel>Comments (optional)</FormLabel>
                                    <Textarea
                                        value={ratingComments}
                                        onChange={(e) => setRatingComments(e.target.value)}
                                        placeholder="Share your experience with this doctor..."
                                        minRows={3}
                                    />
                                </FormControl>
                                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        onClick={handleSaveRating}
                                        disabled={ratingStars === 0}
                                        loading={updateLoading}
                                    >
                                        Update Rating
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outlined"
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Stack>
                        )}
                    </Card>
                )}

                {/* Diagnosis Section */}
                {appointment?.status == 'COMPLETED' && appointment?.diagnoses?.map((diagnosis, index) =>
                    <Card key={index} variant="outlined">
                        <Box sx={{ mb: 1 }}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography level="title-md">Diagnosis {appointment.diagnoses!.length > 1 ? `#${index + 1}` : ''}: </Typography>
                                <Typography level="title-md" sx={{ fontWeight: 'bold', color: 'primary.500' }}>
                                    {diagnosis.decease ?? 'No diagnosis provided.'}
                                </Typography>
                            </Stack>
                        </Box>
                        <Divider />
                        <Stack sx={{ my: 2 }}>
                            <FormControl>
                                <FormLabel>Diagnosis Details:</FormLabel>
                                <Box sx={{
                                    p: 1.5,
                                    bgcolor: 'background.level1',
                                    borderRadius: 'sm',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    minHeight: '80px'
                                }}>
                                    <Typography level="body-sm" sx={{ whiteSpace: 'pre-wrap' }}>
                                        {diagnosis.details || 'No additional details provided.'}
                                    </Typography>
                                </Box>
                            </FormControl>
                        </Stack>
                    </Card>
                )}
            </Box>
        </Box>
    );
}