import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Select, Stack, Typography, Option, IconButton } from "@mui/joy";
import SectionTitle from "../../../components/SectionTitle";
import React from "react";
import MaterialCalendar from "../../../components/MaterialCalendar";
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAvailabilities, useSetAvailability, useDeleteAvailability } from "../../../hooks/availability";

export default function SetAvailabilities() {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = React.useState<string>("9");
    const [previewSlots, setPreviewSlots] = React.useState<string[]>([]);
    const { setAvailability } = useSetAvailability();
    const { deleteAvailability } = useDeleteAvailability();
    const { availabilities, refreshAvailabilities } = useAvailabilities();

    // Helper function to check if a date is in the past
    const isDateInPast = (date: Date | null) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        return checkDate < today;
    };

    React.useEffect(() => {
        if (selectedDate && previewSlots.length > 0) {
            const updatedSlots = previewSlots.map(slot => {
                const oldDate = new Date(slot);
                const newDateTime = new Date(selectedDate);
                newDateTime.setHours(oldDate.getHours(), oldDate.getMinutes(), 0, 0);
                return newDateTime.toISOString();
            });
            setPreviewSlots(updatedSlots);
        }
    }, [selectedDate]);

    const addSlot = () => {
        if (selectedDate) {
            // Check if selected date is in the past
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to beginning of day for comparison
            const selectedDateOnly = new Date(selectedDate);
            selectedDateOnly.setHours(0, 0, 0, 0);

            if (selectedDateOnly < today) {
                // Don't add slots for past dates
                return;
            }

            const dateTime = new Date(selectedDate);
            dateTime.setHours(parseInt(selectedTime), 0, 0, 0);
            const isoString = dateTime.toISOString();

            // Check both preview slots and existing availabilities for uniqueness
            const existingSlots = availabilities.map(a => a.timefrom);
            if (!previewSlots.includes(isoString) && !existingSlots.includes(isoString)) {
                setPreviewSlots([...previewSlots, isoString]);
            }
        }
    };

    const removePreviewSlot = (slotToRemove: string) => {
        setPreviewSlots(previewSlots.filter(slot => slot !== slotToRemove));
    };

    const submitSlots = () => {
        // Filter out any slots that might be in the past
        const validSlots = previewSlots.filter(slot => {
            const slotDate = new Date(slot);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            slotDate.setHours(0, 0, 0, 0);
            return slotDate >= today;
        });

        if (validSlots.length === 0) {
            // No valid slots to submit
            return;
        }

        const slotsData = { slots: validSlots };
        setAvailability(slotsData, () => {
            setPreviewSlots([]);
            refreshAvailabilities();
        });
    };

    const handleDeleteAvailability = (availabilityId: number) => {
        deleteAvailability(availabilityId, refreshAvailabilities);
    };

    return (

        <React.Fragment>
            <SectionTitle
                title="Set Availabilities"
                subtitle="Choose your open time slots to make scheduling easy for your patients"
            />
            <Box sx={{ px: 2, flex: 1, width: '100%' }}>
                <Stack direction="column" spacing={3} alignItems='stretch'>

                    <Stack direction="row" alignItems='flex-start' spacing={3} sx={{ width: '100%' }}>

                        <Card variant="outlined" sx={{ flex: '0 0 auto' }}>
                            <MaterialCalendar
                                setDate={value => {
                                    const date = value?.toDate() || null;
                                    // Double check to prevent past dates from being set
                                    if (date && !isDateInPast(date)) {
                                        setSelectedDate(date);
                                    } else if (date && isDateInPast(date)) {
                                        // Clear selection if past date is somehow selected
                                        setSelectedDate(null);
                                    } else {
                                        setSelectedDate(date);
                                    }
                                }}
                                shouldDisableDate={(date) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    return date.toDate() < today;
                                }}
                            />
                        </Card>

                        {/* Add Availabilities Section - Now beside calendar */}
                        <Card sx={{ flex: 1, minHeight: '360px' }}>
                            <Stack direction='column' sx={{ mb: 1 }}>
                                <Typography level="title-md">Add Availabilities</Typography>
                                <Typography level="body-sm">
                                    Consult your calendar, select a date and add open time slots to allow patients book an appointment with you
                                </Typography>
                            </Stack>
                            <Divider />
                            <Stack
                                direction="column"
                                display='flex'
                                spacing={2}
                                sx={{ my: 1 }}
                            >
                                <Box sx={{ mb: 1 }}>
                                    <Stack spacing={2}>
                                        <FormControl>
                                            <FormLabel>Date</FormLabel>
                                            <Typography level="body-sm">
                                                {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
                                            </Typography>
                                            {selectedDate && isDateInPast(selectedDate) && (
                                                <Typography level="body-xs" sx={{ color: 'danger.500', mt: 0.5 }}>
                                                    ⚠️ Cannot select past dates for availability
                                                </Typography>
                                            )}
                                        </FormControl>
                                        {selectedDate && (
                                            <FormControl>
                                                <FormLabel>Time</FormLabel>
                                                <Select
                                                    size="sm"
                                                    startDecorator={<AccessTimeFilledRoundedIcon />}
                                                    value={selectedTime}
                                                    onChange={(_, value) => setSelectedTime(value as string)}
                                                >
                                                    {Array.from({ length: 9 }, (_, i) => (
                                                        <Option key={i} value={`${i + 9}`}>
                                                            <Typography textColor="text.tertiary" sx={{ ml: 0.5 }}>
                                                                {`${i + 9}:00`}
                                                            </Typography>
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    </Stack>
                                </Box>

                                {/* Preview List - Now inside the add form */}
                                {previewSlots.length > 0 && (
                                    <Box>
                                        <Typography level="body-sm" sx={{ mb: 1, fontWeight: 'md' }}>
                                            Preview - Pending Slots
                                        </Typography>
                                        <Stack
                                            direction="column"
                                            spacing={1}
                                            sx={{
                                                maxHeight: '120px',
                                                overflowY: 'auto',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 'sm',
                                                p: 1
                                            }}
                                        >
                                            {previewSlots.map((slot, index) => (
                                                <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography level="body-xs">
                                                        {new Date(slot).toLocaleDateString()} at {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </Typography>
                                                    <IconButton size="sm" variant="soft" color="danger" onClick={() => removePreviewSlot(slot)}>
                                                        ×
                                                    </IconButton>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </Box>
                                )}
                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        onClick={addSlot}
                                        disabled={!selectedDate || isDateInPast(selectedDate)}
                                        title={
                                            !selectedDate
                                                ? "Please select a date first"
                                                : isDateInPast(selectedDate)
                                                ? "Cannot add slots for past dates"
                                                : "Add this time slot"
                                        }
                                    >
                                        {!selectedDate
                                            ? "Select Date First"
                                            : isDateInPast(selectedDate)
                                            ? "Past Date Selected"
                                            : "Add Time Slot"
                                        }
                                    </Button>
                                    {previewSlots.length > 0 && (
                                        <Button size="sm" variant="solid" color="primary" onClick={submitSlots}>
                                            Submit All ({previewSlots.length})
                                        </Button>
                                    )}
                                </CardActions>
                            </CardOverflow>
                        </Card>
                    </Stack>

                    {/* Submitted Availabilities Section - Now at bottom */}
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Submitted Availabilities</Typography>
                            <Typography level="body-sm">
                                Your confirmed availability time slots. You can delete available slots that haven't been booked yet.
                            </Typography>
                        </Box>
                        <Divider />

                        <Stack
                            direction="column"
                            divider={<Divider orientation="horizontal" />}
                            spacing={2}
                            sx={{
                                maxHeight: '300px',
                                display: 'flex',
                                my: 1,
                                overflowY: 'auto',
                                overflowX: 'hidden'
                            }}
                        >
                            {availabilities.length === 0 ? (
                                <Typography level="body-sm" color="neutral">
                                    No submitted slots yet
                                </Typography>
                            ) : (
                                availabilities.map((availability) => (
                                    <Stack key={availability.availabilityid} direction="row" alignItems="center" spacing={1}>
                                        {availability.free === 1 ? (
                                            <CheckCircleIcon fontSize="small" sx={{ color: 'success.500' }} />
                                        ) : (
                                            <EventBusyIcon fontSize="small" sx={{ color: 'danger.500' }} />
                                        )}
                                        <Typography level="body-sm" sx={{ flex: 1 }}>
                                            {new Date(availability.timefrom).toLocaleDateString()} at {new Date(availability.timefrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                        <Typography level="body-xs" sx={{ color: availability.free === 1 ? 'success.500' : 'danger.500' }}>
                                            {availability.free === 1 ? 'Available' : 'Booked'}
                                        </Typography>
                                        {availability.free === 1 && (
                                            <IconButton
                                                size="sm"
                                                variant="soft"
                                                color="danger"
                                                onClick={() => handleDeleteAvailability(availability.availabilityid)}
                                                sx={{ ml: 1 }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Stack>
                                ))
                            )}
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </React.Fragment>

    );
}