import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryIcon from '@mui/icons-material/History';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { userStore } from '../../stores';
import { UserType } from '../../types';
import DarkModeToggle from '../DarkModeToggle';
import SmartAvatar from '../SmartAvatar';

const PatientList = () => <>
    <ListItem>
        <ListItemButton
            to='/home'
            component={Link}
            role='menuitem'
        >
            <HomeRoundedIcon />
            <ListItemContent>
                <Typography level='title-sm'>Home</Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
    <ListItem>
        <ListItemButton
            to='/my-appointments'
            component={Link}
            role='menuitem'
        >
            <CalendarMonthIcon />
            <ListItemContent>
                <Typography level='title-sm'>
                    My Appointments
                </Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
    <ListItem>
        <ListItemButton
            to='/history'
            component={Link}
            role='menuitem'
        >
            <HistoryIcon />
            <ListItemContent>
                <Typography level='title-sm'>
                    History
                </Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
    <ListItem>
        <ListItemButton
            to='/profile'
            component={Link}
            role='menuitem'
        >
            <AccountCircleIcon />
            <ListItemContent>
                <Typography level='title-sm'>
                    Profile
                </Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
</>


const DoctorList = () => <>
    <ListItem>
        <ListItemButton
            to='/doctor-home'
            component={Link}
            role='menuitem'
        >
            <HomeRoundedIcon />
            <ListItemContent>
                <Typography level='title-sm'>Home</Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
    <ListItem>
        <ListItemButton
            to='/availabilities'
            component={Link}
            role='menuitem'
        >
            <CalendarMonthIcon />
            <ListItemContent>
                <Typography level='title-sm'>
                    Set Availabilities
                </Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
    <ListItem>
        <ListItemButton
            to='/doctor-appointments'
            component={Link}
            role='menuitem'
        >
            <HistoryIcon />
            <ListItemContent>
                <Typography level='title-sm'>
                    History
                </Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
    <ListItem>
        <ListItemButton
            to='/doctor-ratings'
            component={Link}
            role='menuitem'
        >
            <StarIcon />
            <ListItemContent>
                <Typography level='title-sm'>
                    My Reviews
                </Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
    <ListItem>
        <ListItemButton
            to='/doctor-profile'
            component={Link}
            role='menuitem'
        >
            <AccountCircleIcon />
            <ListItemContent>
                <Typography level='title-sm'>
                    Profile
                </Typography>
            </ListItemContent>
        </ListItemButton>
    </ListItem>
</>

export default observer(() => {
    const home = userStore.userType === UserType.Patient ? '/home' : '/doctor-home';
    const { avatarData, fullName, email } = userStore;

    return (
        <Sheet
            className='Sidebar'
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
                },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '240px',
                        },
                    },
                })}
            />
            <Box
                className='Sidebar-overlay'
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    opacity: 'var(--SideNavigation-slideIn)',
                    backgroundColor: 'var(--joy-palette-background-backdrop)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Link to={home} style={{ textDecoration: 'none' }}>
                    <Box
                        sx={{
                            backgroundImage: 'url(/src/assets/mediq.png)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            width: 128,
                            height: 60,
                            cursor: 'pointer',
                        }}
                    />
                </Link>
            </Box>
            <Divider />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size='sm'
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    {userStore.userType === UserType.Patient ? <PatientList /> : <DoctorList />}
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <SmartAvatar
                    src={avatarData}
                    name={fullName}
                    size='sm'
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level='title-sm'>{`${fullName}`}</Typography>
                    <Typography level='body-xs'>{`${email}`}</Typography>
                </Box>
                <DarkModeToggle
                    size='sm'
                    sx={{ mr: 0.5 }}
                />
                <IconButton
                    size='sm'
                    variant='plain'
                    color='neutral'
                    onClick={() => userStore.logout()}
                >
                    <LogoutRoundedIcon />
                </IconButton>
            </Box>
        </Sheet>
    );
});
