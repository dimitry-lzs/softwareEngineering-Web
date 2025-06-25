import { useState } from 'react';
import {
    Box,
    Card,
    Stack,
    Typography,
    Divider,
    Button,
    CircularProgress,
    Chip
} from '@mui/joy';
import { Star, AutoAwesome } from '@mui/icons-material';

import SectionTitle from '../../../components/SectionTitle';
import SmartAvatar from '../../../components/SmartAvatar';
import { useMyDoctorRatings } from '../../../hooks/doctor';
import { useSummary } from '../../../hooks/summary';

export default function DoctorRatings() {
    const { ratings, loading: ratingsLoading } = useMyDoctorRatings();
    const { generateDoctorRoast } = useSummary();

    const [aiRoast, setAiRoast] = useState<string>('');
    const [loadingRoast, setLoadingRoast] = useState(false);

    // Calculate average rating from actual ratings data
    const averageRating = ratings && ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating.stars, 0) / ratings.length
        : 0;
    const totalReviews = ratings?.length || 0;

    const generateRoast = async () => {
        if (!ratings || ratings.length === 0) return;

        setLoadingRoast(true);
        try {
            const reviewComments = ratings.map((rating) => rating.comments).filter(Boolean);
            const response = await generateDoctorRoast(reviewComments);

            // Extract the roast from the response
            const roastText = response?.choices?.[0]?.message?.content || 'No roast generated';
            setAiRoast(roastText);
        } catch (error) {
            console.error('Failed to generate roast:', error);
            setAiRoast('AI is having a bad day... just like your patients! 😄');
        } finally {
            setLoadingRoast(false);
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                fontSize="small"
                sx={{
                    color: index < rating ? 'warning.400' : 'neutral.300',
                    opacity: index < rating ? 1 : 0.3
                }}
            />
        ));
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle
                title="My Reviews"
                subtitle="See what your patients think about your care"
            />

            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '900px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                {/* Doctor Rating Overview Card */}
                <Card
                    variant="outlined"
                    sx={{
                        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(33, 150, 243, 0.02) 100%)',
                        border: '1px solid',
                        borderColor: 'primary.200'
                    }}
                >
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography level="h1" sx={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'primary.600' }}>
                                {averageRating.toFixed(1)}
                            </Typography>
                            <Stack direction="row" justifyContent="center" spacing={0.5} sx={{ mb: 1 }}>
                                {renderStars(Math.round(averageRating))}
                            </Stack>
                            <Typography level="body-sm" color="neutral">
                                {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                            </Typography>
                        </Box>

                        <Divider orientation="vertical" />

                        <Box sx={{ flex: 1 }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <Typography level="title-lg">AI Insights</Typography>
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="warning"
                                    startDecorator={<AutoAwesome />}
                                    onClick={generateRoast}
                                    loading={loadingRoast}
                                    disabled={!ratings || ratings.length === 0}
                                >
                                    {aiRoast ? 'Generate New' : 'Generate Insight'}
                                </Button>
                            </Stack>

                            {aiRoast ? (
                                <Card
                                    variant="soft"
                                    color="warning"
                                    sx={{
                                        background: (theme) => theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.15) 0%, rgba(255, 235, 59, 0.08) 100%)'
                                            : 'linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 235, 59, 0.05) 100%)',
                                        border: '1px dashed',
                                        borderColor: (theme) => theme.palette.mode === 'dark'
                                            ? 'warning.400'
                                            : 'warning.300'
                                    }}
                                >
                                    <Typography
                                        level="body-md"
                                        sx={{
                                            fontStyle: 'italic',
                                            color: (theme) => theme.palette.mode === 'dark'
                                                ? 'warning.300'
                                                : 'warning.700'
                                        }}
                                    >
                                        "{aiRoast}"
                                    </Typography>
                                </Card>
                            ) : (
                                <Typography level="body-sm" color="neutral">
                                    {ratings && ratings.length > 0
                                        ? 'Click "Generate Insight" for an AI-powered analysis of your patient reviews!'
                                        : 'No reviews yet to analyze! �'
                                    }
                                </Typography>
                            )}
                        </Box>
                    </Stack>
                </Card>

                {/* Reviews List */}
                <Card>
                    <Box sx={{ mb: 2 }}>
                        <Typography level="title-md">Patient Reviews</Typography>
                        <Typography level="body-sm" color="neutral">
                            Detailed feedback from your appointments
                        </Typography>
                    </Box>
                    <Divider />

                    {ratingsLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress size="md" />
                        </Box>
                    ) : !ratings || ratings.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography level="body-lg" color="neutral">
                                No reviews yet
                            </Typography>
                            <Typography level="body-sm" color="neutral" sx={{ mt: 1 }}>
                                Complete more appointments to start receiving patient feedback
                            </Typography>
                        </Box>
                    ) : (
                        <Stack spacing={0} divider={<Divider />}>
                            {ratings.map((rating, index) => (
                                <Box key={rating.appointmentid || index} sx={{ py: 3 }}>
                                    <Stack direction="row" spacing={2}>
                                        <SmartAvatar
                                            name="Anonymous Patient"
                                            size="lg"
                                            sx={{ flexShrink: 0 }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                                <Typography level="title-sm">Anonymous Patient</Typography>
                                                <Chip
                                                    size="sm"
                                                    variant="soft"
                                                    color={rating.stars >= 4 ? 'success' : rating.stars >= 3 ? 'warning' : 'danger'}
                                                    startDecorator={<Star fontSize="inherit" />}
                                                >
                                                    {rating.stars}/5
                                                </Chip>
                                            </Stack>

                                            <Stack direction="row" spacing={0.5} sx={{ mb: 2 }}>
                                                {renderStars(rating.stars)}
                                            </Stack>

                                            {rating.comments && (
                                                <Typography level="body-md" sx={{ lineHeight: 1.6 }}>
                                                    "{rating.comments}"
                                                </Typography>
                                            )}
                                        </Box>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    )}
                </Card>
            </Stack>
        </Box>
    );
}
