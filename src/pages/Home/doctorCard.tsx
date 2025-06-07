import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
// import Chip from '@mui/joy/Chip';
// import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
// import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
// import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
// import KingBedRoundedIcon from '@mui/icons-material/KingBedRounded';
// import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import Rating from './rating';
import Button from '@mui/joy/Button';



type DoctorCardProps = {
  specialty: React.ReactNode;
  image: string;
  rating: number;
  location: string;
  title: React.ReactNode;
};

export default function DoctorCard(props: DoctorCardProps) {
  const { specialty: category, title, location, rating, image } = props;
  // const [isLiked, setIsLiked] = React.useState(liked);
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
            Athens {/*Doctor location*/}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ mt: 'auto' }}>
          <Rating rating={rating}/>
          <Button size="sm" variant="solid" sx={{textAlign: 'right', ml: 'auto'}} color="primary">
            Check Availability
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}