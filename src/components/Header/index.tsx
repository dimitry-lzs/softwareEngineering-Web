import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export default function Header() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                // separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
            >
                <Link
                    underline="none"
                    color="neutral"
                    component={RouterLink}
                    to="/"
                    aria-label="Home"
                >
                    <HomeRoundedIcon />
                </Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Typography
                            key={to}
                            color="neutral"
                            sx={{ fontWeight: 500, fontSize: 13 }}
                        >
                            {value}
                        </Typography>
                    ) : (
                        <Link
                            key={to}
                            underline="hover"
                            color="neutral"
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
}