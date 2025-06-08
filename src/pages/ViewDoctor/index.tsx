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
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';;
import CheckIcon from '@mui/icons-material/Check';
import Rating from '../Home/rating';
import { Avatar, ListItemDecorator } from '@mui/joy';


export default function ViewDoctor() {
    const [selected, setSelected] = React.useState<string | null>(null);
    const [selectedTab, setSelectedTab] = React.useState(2);
    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon fontSize="small" />}
                        sx={{ pl: 0 }}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            href="#some-link"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon />
                        </Link>
                        <Link
                            underline="hover"
                            color="neutral"
                            href="#some-link"
                            sx={{ fontSize: 12, fontWeight: 500 }}
                        >
                            Users
                        </Link>
                        <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                            My profile
                        </Typography>
                    </Breadcrumbs>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        View Doctor Profile
                    </Typography>
                </Box>
            </Box>
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
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
                                <Stack gap={2} pl={2}>
                                    <FormControl>
                                        <FormLabel>Kalos Giatros</FormLabel>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Cardilogist</FormLabel>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Email</FormLabel>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Stack direction="row"
                                alignItems="flex-start"
                                justifyContent="flex-end"
                                pr={1}
                            >
                                <Rating rating={4.5} />
                            </Stack>
                        </Stack>
                    </Stack>
                    <Tabs
                        value={selectedTab}
                        onChange={(event, newValue) => setSelectedTab(newValue as number)} // Update selected tab
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
                                    Write a short introduction to be displayed on your profile
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloopBleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Iatriki Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloopBleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Iatriki Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Iatriki Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloopBleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Iatriki Bleep bloop Bleep bloop Bleep bloop
                                    Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop Bleep bloop
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
                                        <Stack direction="row" mx={1} gap={1}>
                                            <Avatar size="lg" sx={{ mr: 0.5 }}>U</Avatar>
                                            <Stack direction="column" gap={1} ml={1}>
                                                <Typography level="body-sm">Review 1: Excellent doctor!</Typography> {/*if any review exists show it, else show only rating*/}
                                                <Rating rating={4} />
                                            </Stack>
                                        </Stack>

                                        {/* For demonstration, each review will be structured like the one above*/}

                                        <Typography level="body-sm">Review 2: Very professional.</Typography>
                                        <Typography level="body-sm">Review 3: Highly recommended!</Typography>
                                        <Typography level="body-sm">Review 1: Excellent doctor!</Typography>
                                        <Typography level="body-sm">Review 2: Very professional.</Typography>
                                        <Typography level="body-sm">Review 3: Highly recommended!</Typography>
                                        <Typography level="body-sm">Review 1: Excellent doctor!</Typography>
                                        <Typography level="body-sm">Review 2: Very professional.</Typography>
                                        <Typography level="body-sm">Review 3: Highly recommended!</Typography>
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
                                {[
                                    '2:00 - 02/06/2025',
                                    '3:00 - 02/06/2025',
                                    '4:00 - 02/06/2025',
                                    '5:00 - 02/06/2025',
                                    '6:00 - 02/06/2025',
                                    '7:00 - 02/06/2025',
                                    '8:00 - 02/06/2025',
                                    '9:00 - 02/06/2025',
                                    '10:00 - 02/06/2025',
                                    '11:00 - 02/06/2025',
                                    '12:00 - 02/06/2025',
                                    '13:00 - 02/06/2025',
                                    '7:00 - 02/06/2025',
                                    '8:00 - 02/06/2025',
                                    '9:00 - 02/06/2025',
                                    '10:00 - 02/06/2025',
                                    '11:00 - 02/06/2025',
                                    '12:00 - 02/06/2025',
                                    '13:00 - 02/06/2025'
                                ].map((name) => {
                                    const checked = selected === name;
                                    return (
                                        <Chip
                                            key={name}
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
                                                label={name}
                                                checked={checked}
                                                onChange={() => {
                                                    setSelected(checked ? null : name);
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
        </Box>
    );
}
