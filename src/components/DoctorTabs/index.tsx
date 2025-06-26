import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import { AutoAwesome } from '@mui/icons-material';

import SmartAvatar from '../SmartAvatar';
import Rating from '../../pages/Home/rating';
import { Doctor, Rating as RatingType } from '../../types';
import { LowercaseType } from '../../hooks/lowercase';
import { useSummary } from '../../hooks/summary';

interface DoctorTabsProps {
    doctor: LowercaseType<Doctor> | null | undefined;
    ratings: LowercaseType<RatingType>[];
}

export default function DoctorTabs({ doctor, ratings }: DoctorTabsProps) {
    const [selectedTab, setSelectedTab] = React.useState(2);
    const { generateDoctorSummaryToPatient } = useSummary();
    const [aiSummary, setAiSummary] = React.useState<string>('');
    const [loadingSummary, setLoadingSummary] = React.useState(false);

    const generateSummary = async () => {
        if (!doctor || !ratings) return;

        setLoadingSummary(true);
        try {
            const reviewComments = ratings.map((rating) => rating.comments).filter(Boolean);
            const response = await generateDoctorSummaryToPatient(
                reviewComments,
                doctor.bio || ''
            );

            // Extract the summary from the response
            const summaryText = response?.choices?.[0]?.message?.content || 'No summary generated';
            setAiSummary(summaryText);
        } catch (error) {
            console.error('Failed to generate summary:', error);
            setAiSummary('AI is taking a coffee break... just like this doctor might be! ☕');
        } finally {
            setLoadingSummary(false);
        }
    };

    return (
        <>
            <Tabs
                value={selectedTab}
                onChange={(_event, newValue) => setSelectedTab(newValue as number)}
                defaultValue={2}
                sx={{ bgcolor: 'transparent' }}
            >
                <TabList
                    tabFlex={1}
                    size="sm"
                    sx={{
                        pl: { xs: 0, md: 4 },
                        justifyContent: 'center',
                        [`&& .${tabClasses.root}`]: {
                            fontWeight: '600',
                            flex: 'initial',
                            color: 'text.tertiary',
                            [`&.${tabClasses.selected}`]: {
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                '&::after': {
                                    height: '2px',
                                    bgcolor: 'primary.500',
                                },
                            },
                        },
                    }}
                >
                    <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                        About
                    </Tab>
                    <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                        Reviews
                    </Tab>
                </TabList>
            </Tabs>
            <Box
                sx={{
                    mb: 1,
                    ml: 0.5,
                    height: '250px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
            >
                {selectedTab === 2 && (
                    <div>
                        <Typography sx={{ mb: 1 }} level="title-sm">
                            Education and Experience
                        </Typography>
                        <Typography level="body-sm">
                            {doctor?.bio || 'No additional information available.'}
                        </Typography>
                    </div>
                )}
                {selectedTab === 3 && (
                    <div>
                        {/* AI Summary Section */}
                        <Box sx={{ mb: 3 }}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <Typography level="title-sm" sx={{ fontWeight: 'bold' }}>
                                    AI Patient Insights
                                </Typography>
                                <Button
                                    size="sm"
                                    variant="soft"
                                    color="primary"
                                    startDecorator={<AutoAwesome />}
                                    onClick={generateSummary}
                                    loading={loadingSummary}
                                    disabled={!doctor || !ratings || ratings.length === 0}
                                    sx={{ fontSize: '0.75rem', py: 0.5, px: 1 }}
                                >
                                    {aiSummary ? 'New Summary' : 'Get Summary'}
                                </Button>
                            </Stack>

                            {aiSummary ? (
                                <Card
                                    variant="soft"
                                    color="primary"
                                    sx={{
                                        background: (theme) => theme.palette.mode === 'dark'
                                            ? 'linear-gradient(135deg, rgba(25, 118, 210, 0.15) 0%, rgba(33, 150, 243, 0.08) 100%)'
                                            : 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
                                        border: '1px dashed',
                                        borderColor: (theme) => theme.palette.mode === 'dark'
                                            ? 'primary.400'
                                            : 'primary.300',
                                        mb: 2
                                    }}
                                >
                                    <Typography
                                        level="body-sm"
                                        sx={{
                                            fontStyle: 'italic',
                                            color: (theme) => theme.palette.mode === 'dark'
                                                ? 'primary.300'
                                                : 'primary.700',
                                            lineHeight: 1.5
                                        }}
                                    >
                                        "{aiSummary}"
                                    </Typography>
                                </Card>
                            ) : (
                                <Typography level="body-xs" color="neutral" sx={{ mb: 2 }}>
                                    {ratings && ratings.length > 0
                                        ? 'Get an AI-powered summary of this doctor based on patient reviews and experience!'
                                        : 'No reviews available for AI summary 🤖'
                                    }
                                </Typography>
                            )}

                            <Divider sx={{ my: 2 }} />
                        </Box>

                        <Stack spacing={2}>
                            {ratings.length > 0 ? (
                                <Stack
                                    direction="column"
                                    divider={<Divider orientation="horizontal" />}
                                    spacing={2}
                                >
                                    {ratings.map((rating, index) => (
                                        <Stack key={index} direction="row" mx={1} gap={1}>
                                            <SmartAvatar
                                                size="lg"
                                                name="Anonymous"
                                                sx={{ mr: 0.5 }}
                                            />
                                            <Stack direction="column" gap={1} ml={1}>
                                                <Typography level="body-sm">{rating.comments}</Typography>
                                                <Rating rating={rating.stars} />
                                            </Stack>
                                        </Stack>
                                    ))}
                                </Stack>
                            ) : (
                                <Typography level="body-md" sx={{ textAlign: 'center', py: 2, color: 'text.secondary' }}>
                                    No reviews available yet.
                                </Typography>
                            )}
                        </Stack>
                    </div>
                )}
            </Box>
        </>
    );
}
