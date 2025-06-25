import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import Rating from './rating';
import { OfficeLocation, Speciality } from '../../types';
import formatString from '../../misc/formatSpeciality';
import { useNavigate } from 'react-router';
import SmartAvatar from '../../components/SmartAvatar';

type DoctorCardProps = {
    id: number;
    specialty: Speciality;
    image: string;
    rating: number;
    location: OfficeLocation;
    title: string;
};

export default function DoctorCard(props: DoctorCardProps) {
    const navigate = useNavigate();
    const { specialty: category, title, location, rating, image, id } = props;

    const handleCardClick = () => {
        navigate(`/home/${id}`);
    };

    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            onClick={handleCardClick}
            sx={{
                bgcolor: 'neutral.softBg',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 'lg',
                    borderColor: 'primary.outlinedBorder',
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease-in-out',
                    '& .MuiAvatar-root': {
                        transform: 'scale(1.02)',
                    }
                },
                '&:active': {
                    transform: 'translateY(0px)',
                    boxShadow: 'md',
                },
                transition: 'all 0.2s ease-in-out',
            }}
        >
            <Box
                sx={{
                    width: { xs: '100%', sm: '120px', md: '160px' },
                    height: '100%',
                    minHeight: { xs: '200px', sm: '100%' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    p: 1
                }}
            >
                <SmartAvatar
                    src={image}
                    name={title}
                    sx={{
                        width: { xs: '120px', sm: '100px', md: '120px' },
                        height: { xs: '120px', sm: '100px', md: '120px' },
                        borderRadius: '50%'
                    }}
                />
            </Box>
            <CardContent>
                <Stack
                    spacing={1}
                    direction="row"
                    sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
                >
                    <div>
                        <Typography level="body-sm">{category}</Typography>
                        <Typography level="title-md">
                            {title}
                        </Typography>
                    </div>
                </Stack>
                <Stack
                    spacing="0.25rem 1rem"
                    direction="row"
                    useFlexGap
                    sx={{ flexWrap: 'wrap', my: 0.25 }}
                >
                    <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
                        {formatString(location)}
                    </Typography>
                </Stack>
                <Stack direction="row" sx={{ mt: 'auto', alignItems: 'center' }}>
                    <Rating rating={rating} />
                </Stack>
            </CardContent>
        </Card>
    );
}