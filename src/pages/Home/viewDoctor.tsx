import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Checkbox from '@mui/joy/Checkbox';
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

import CheckIcon from '@mui/icons-material/Check';
import Rating from '../Home/rating';
import { Avatar } from '@mui/joy';
import SectionTitle from '../../components/SectionTitle';
import { useParams } from 'react-router';
import { useDoctor, useDoctorRatings } from '../../hooks';
import formatString from '../../misc/formatSpeciality';
import { useDoctorAvailability } from '../../hooks/availability';


export default function ViewDoctor() {
    const { id } = useParams<{ id: string }>();
    const { doctor } = useDoctor(id);
    const { ratings } = useDoctorRatings(id);
    const { availabilities } = useDoctorAvailability(id);
    const [selected, setSelected] = React.useState<number | null>(null);
    const [selectedTab, setSelectedTab] = React.useState(2);

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle title="View Doctor" subtitle="Book an appointment" />
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
                            <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={108}
                                    sx={{ flex: 1, minWidth: 108, borderRadius: '100%' }}
                                >
                                    <img alt="" src={doctor?.avatar} />
                                </AspectRatio>
                            </Stack>
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
                                    <Stack
                                        direction="column"
                                        divider={<Divider orientation="horizontal" />}
                                        spacing={2}
                                    >
                                        {ratings.map((rating) => (
                                            <Stack direction="row" mx={1} gap={1}>
                                                <Avatar size="lg" sx={{ mr: 0.5 }}>A</Avatar>
                                                <Stack direction="column" gap={1} ml={1}>
                                                    <Typography level="body-sm">{rating.comments}</Typography>
                                                    <Rating rating={rating.stars} />
                                                </Stack>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Stack>
                            </div>
                        )}
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
                            <Button size="sm" variant="solid">
                                Continue
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box >
    );
}
