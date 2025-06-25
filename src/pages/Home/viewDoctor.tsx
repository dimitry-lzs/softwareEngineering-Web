import * as React from 'react';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import Rating from './rating';
import SmartAvatar from '../../components/SmartAvatar';
import SectionTitle from '../../components/SectionTitle';
import { useDoctor, useDoctorRatings } from '../../hooks';
import formatString from '../../misc/formatSpeciality';
import { useNavigate } from 'react-router';

export default function ViewDoctor({
    id,
    setPage,
}: {
    id: string;
    setPage: (page: number) => void;
}) {

    const { doctor } = useDoctor(id);
    const { ratings } = useDoctorRatings(id);
    const [selectedTab, setSelectedTab] = React.useState(2);
    const navigate = useNavigate();

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
                        <Typography level="title-md">Doctor Details</Typography>
                    </Box>
                    <Divider />
                    <Stack
                        direction="column"
                        spacing={2}
                        sx={{ display: 'flex', my: 1 }}
                    >
                        <Stack direction="row" spacing={2} px={1}>
                            <Box
                                sx={{
                                    width: 108,
                                    height: 108,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                }}
                            >
                                <SmartAvatar
                                    src={doctor?.avatar}
                                    name={doctor?.fullname || 'Doctor'}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 0, // Remove border radius from avatar since container handles it
                                    }}
                                />
                            </Box>
                            <Stack direction="column" spacing={0.5} sx={{ flexGrow: 1 }}>
                                <Stack gap={0} pl={2}>
                                    <FormControl>
                                        <FormLabel>
                                            <Typography level="h4">
                                                {doctor?.fullname}
                                            </Typography>
                                        </FormLabel>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>
                                            <Typography level="title-lg">
                                                {formatString(doctor?.speciality ?? '')}
                                            </Typography>
                                        </FormLabel>
                                    </FormControl>
                                </Stack>
                                <Stack gap={0} pl={2}>
                                    <FormControl>
                                        <FormLabel>Email: {doctor?.email}</FormLabel>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Phone: {doctor?.phone}</FormLabel>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Stack direction="row"
                                alignItems="flex-start"
                                justifyContent="flex-end"
                                pr={1}
                            >
                                <Rating rating={doctor?.rating ?? 0} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Tabs
                        value={selectedTab}
                        onChange={(_event, newValue) => setSelectedTab(newValue as number)} // Update selected tab
                        defaultValue={2} sx={{ bgcolor: 'transparent' }}>

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
                            <Tab sx={{ borderRadius: '6px 6px 0 0', }} indicatorInset value={2}>
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
                            overflowX: 'hidden', // Enable horizontal scrolling
                            overflowY: 'auto', // Prevent tabs from wrapping
                        }}
                    >
                        {selectedTab === 2 && (
                            <div>
                                <Typography sx={{ mb: 1 }} level="title-sm">Education and Experience</Typography>
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
                                            {ratings.map((rating) => (
                                                <Stack direction="row" mx={1} gap={1}>
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
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                onClick={() => { navigate('/home'); }}>
                                Return to search
                            </Button>
                            <Button
                                size="sm"
                                variant="solid"
                                onClick={() => { setPage(2); }}>
                                Continue
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box >
    );
}