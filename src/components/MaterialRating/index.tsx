import { useColorScheme } from '@mui/joy/styles';
import { Rating } from '@mui/material';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';

export default function MaterialRating({
    value,
    setValue,
    readOnly = false,
}: {
    value: number | null;
    setValue: (value: number) => void;
    readOnly?: boolean;
}) {
    const { mode } = useColorScheme();
    // There is a difference between the mode used by Joy UI and Material UI.
    // Joy UI: 'light', 'dark', 'system'
    // Material UI: 'light', 'dark'
    const resolvedMode: PaletteMode = mode === 'dark' ? 'dark' : 'light';

    const materialTheme = createTheme({
        palette: {
            mode: resolvedMode,
        },
    });
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
