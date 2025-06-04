import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers';

export default function MaterialCalendar() {
    const materialTheme = createTheme();

    return (
        <ThemeProvider theme={materialTheme}>
            <DateCalendar />
        </ThemeProvider>
    );
}
