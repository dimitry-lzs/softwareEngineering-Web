import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import Rating from './rating';
import Button from '@mui/joy/Button';
import { OfficeLocation, Speciality } from '../../types';
import formatString from '../../misc/formatSpeciality';
import { useNavigate } from 'react-router';

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

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: 'neutral.softBg',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        '&:hover': {
          boxShadow: 'lg',
          borderColor: 'var(--joy-palette-neutral-outlinedDisabledBorder)',
        },
      }}
    >
      <CardOverflow
        sx={{
          mr: { xs: 'var(--CardOverflow-offset)', sm: 0 },
          mb: { xs: 0, sm: 'var(--CardOverflow-offset)' },
          '--AspectRatio-radius': {
            xs: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0',
            sm: 'calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))',
          },
        }}
      >
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            '--AspectRatio-maxHeight': { xs: '160px', sm: '9999px' },
          }}
        >
          <img alt="" src={image} />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <div>
            <Typography level="body-sm">{category}</Typography>
            <Typography level="title-md">
              <Link
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: 'text.primary' }}
              >
                {title}
              </Link>
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
        <Stack direction="row" sx={{ mt: 'auto' }}>
          <Rating rating={rating} />
          <Button
            size="sm"
            variant="solid"
            sx={{ textAlign: 'right', ml: 'auto' }}
            color="primary"
            onClick={() => navigate(`/home/${id}`)}
          >
            Check Availability
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}