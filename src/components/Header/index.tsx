import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { userStore } from '../../stores';
import { UserType } from '../../types';

export default observer(function Header() {
    const home = userStore.userType === UserType.Patient ? '/home' : '/doctor-home';
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
                size='sm'
                aria-label='breadcrumbs'
                sx={{ pl: 0 }}
            >
                <Link
                    underline='none'
                    color='neutral'
                    component={RouterLink}
                    to={home}
                    aria-label='Home'
                >
                    <HomeRoundedIcon />
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography
                            key={to}
                            color='neutral'
                            sx={{ fontWeight: 500, fontSize: 13 }}
                        >
                            {value}
                        </Typography>
                    ) : (
                        <Link
                            key={to}
                            underline='hover'
                            color='neutral'
                            component={RouterLink}
                            to={to}
                            sx={{ fontSize: 13, fontWeight: 500 }}
                        >
                            {value}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        </Box>
    );
});