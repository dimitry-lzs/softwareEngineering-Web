import * as React from 'react';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

import SmartAvatar from '../SmartAvatar';
import Rating from '../../pages/Home/rating';
import { Doctor, Rating as RatingType } from '../../types';
import { LowercaseType } from '../../hooks/lowercase';

interface DoctorTabsProps {
    doctor: LowercaseType<Doctor> | null | undefined;
    ratings: LowercaseType<RatingType>[];
}

export default function DoctorTabs({ doctor, ratings }: DoctorTabsProps) {
    const [selectedTab, setSelectedTab] = React.useState(2);

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
