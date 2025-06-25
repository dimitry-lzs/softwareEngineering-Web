import { useColorScheme } from '@mui/joy/styles';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { Dayjs } from 'dayjs';

export default function MaterialCalendar({
    setDate,
    shouldDisableDate
}: {
    setDate?: (date: PickerValue | null) => void;
    shouldDisableDate?: (date: Dayjs) => boolean;
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
            <DateCalendar
                onChange={(newValue: PickerValue | null) => {
                    if (setDate) {
                        setDate(newValue);
                    }
                }}
                shouldDisableDate={shouldDisableDate}
                sx={{
                    width: '500px',
                    minHeight: '400px',
                    display: 'flex',
                    alignItems: 'start',

                    //margin: 4,
                    '& .MuiDayCalendar-root': {
                        fontSize: '1rem', // Increase the font size of the days
                        width: '500px', // Adjust the width of each day cell
                        height: 'auto', // Adjust the height of each day cell
                    },
                    '& .MuiPickersDay-root': {
                        width: '50px', // Adjust the width of each day cell
                        height: '50px', // Adjust the height of each day cell
                        fontSize: '1rem', // Increase the font size of the day numbers
                    },
                    '& .MuiPickersCalendarHeader-root': {
                        width: '500px',
                        minHeight: '50px',
                        fontSize: '1rem', // Adjust the font size of the header
                    },
                    '& .MuiDayCalendar-weekContainer': {
                        gap: '18px', // Add spacing between day cells
                    },
                    '& .MuiDayCalendar-header': {
                        gap: '32px', // Add spacing between day cells
                    },
                }}
            />
        </ThemeProvider>
    );
}
