import * as React from 'react';
import Typography from '@mui/joy/Typography';
import Star from '@mui/icons-material/Star';


type RatingProps = {
  rating: number;
};


export default function Rating({ rating }: RatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ;
  const emptyStars = 5 - Math.ceil(rating);


  return (
    <Typography
      level="title-sm"
      startDecorator={
        <React.Fragment>
          {/* Render full stars */}
          {Array.from({ length: fullStars }).map((_, index) => (
            <Star key={`full-${index}`} sx={{ color: 'warning.400' }} />
          ))}
          {/* Render half star */}
          {halfStar && <Star sx={{ color: 'warning.200' }} />}
          {/* Render empty stars */}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <Star key={`empty-${index}`} sx={{ color: 'neutral.300' }} />
          ))}
        </React.Fragment>
      }
    >
      {rating.toFixed(1)}
    </Typography>
  );
}