import Box from '@mui/joy/Box';
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
        <Box
            onClick={handleCardClick}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'neutral.softBg',
                minHeight: { xs: 'auto', sm: '140px', md: '160px' },
                maxHeight: { xs: '300px', sm: '140px', md: '160px' },
                '&:hover': {
                    boxShadow: 'lg',
                    borderColor: 'primary.outlinedBorder',
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease-in-out',
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
                    flexShrink: 0,
                    overflow: 'hidden',
                    borderRadius: { xs: '8px 8px 0 0', sm: '8px 0 0 8px' }
                }}
            >
                <SmartAvatar
                    src={image}
                    name={title}
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 0
                    }}
                />
            </Box>
            <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
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
            </Box>
        </Box>
    );
}