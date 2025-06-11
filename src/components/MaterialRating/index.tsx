import { Rating } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function MaterialRating({
    value,
    setValue,
    readOnly = false,
}: {
    value: number | null;
    setValue: (value: number) => void;
    readOnly?: boolean;
}) {
    const materialTheme = createTheme();

    return (

        <ThemeProvider theme={materialTheme}>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(_, newValue) => {
                    setValue(newValue && newValue >= 1 ? newValue : 1);
                }}
                readOnly={readOnly}
                defaultValue={1}
                precision={0.5}

            />
        </ThemeProvider>
    );
}
