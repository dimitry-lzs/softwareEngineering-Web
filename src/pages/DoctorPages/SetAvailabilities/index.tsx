import { Box, Button, Card, CardActions, CardOverflow, Divider, FormControl, FormLabel, Select, Stack, Typography, Option } from "@mui/joy";
import SectionTitle from "../../../components/SectionTitle";
import React from "react";
import MaterialCalendar from "../../../components/MaterialCalendar";
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { useAvailabilities, useSetAvailability } from "../../../hooks/availability";

export default function SetAvailabilities() {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = React.useState<string>("9");
    const [previewSlots, setPreviewSlots] = React.useState<string[]>([]);
    const { setAvailability } = useSetAvailability();
    const { availabilities, refreshAvailabilities } = useAvailabilities();

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
        const slotsData = { slots: previewSlots };
        setAvailability(slotsData, () => {
            setPreviewSlots([]);
            refreshAvailabilities();
        });
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
                            <MaterialCalendar setDate={value => {
                                setSelectedDate(value?.toDate() || null);
                            }} />
                        </Card>

                        <Card sx={{ flex: 1, minHeight: '360px' }}>
                            <Box sx={{ mb: 1 }}>
                                <Typography level="title-md">Submitted Availabilities</Typography>
                                <Typography level="body-sm">
                                    Your confirmed availability time slots
                                </Typography>
                            </Box>
                            <Divider />

                            <Stack
                                direction="column"
                                divider={<Divider orientation="horizontal" />}
                                spacing={2}
                                sx={{
                                    height: '306px',
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
                                            <Typography level="body-sm">
                                                {new Date(availability.timefrom).toLocaleDateString()} at {new Date(availability.timefrom).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Typography>
                                            <Typography level="body-xs" sx={{ color: availability.free === 1 ? 'success.500' : 'danger.500', ml: 'auto' }}>
                                                {availability.free === 1 ? 'Available' : 'Booked'}
                                            </Typography>
                                        </Stack>
                                    ))
                                )}
                            </Stack>
                        </Card>
                    </Stack>

                    {/* Add Availabilities Section - Full Width */}
                    <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
                        <Card>
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
                            </Stack>
                            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                    <Button size="sm" variant="solid" onClick={addSlot} disabled={!selectedDate}>
                                        Add
                                    </Button>
                                </CardActions>
                            </CardOverflow>                            </Card>

                        {/* Preview List - Now directly below Add form */}
                        {previewSlots.length > 0 && (
                            <Card>
                                <Box sx={{ mb: 1 }}>
                                    <Typography level="title-md">Preview - Pending Slots</Typography>
                                    <Typography level="body-sm">
                                        Review your selections before submitting
                                    </Typography>
                                </Box>
                                <Divider />
                                <Stack
                                    direction="column"
                                    divider={<Divider orientation="horizontal" />}
                                    spacing={1}
                                    sx={{ my: 1, maxHeight: '200px', overflowY: 'auto' }}
                                >
                                    {previewSlots.map((slot, index) => (
                                        <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography level="body-sm">
                                                {new Date(slot).toLocaleDateString()} at {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Typography>
                                            <Button size="sm" variant="soft" color="danger" onClick={() => removePreviewSlot(slot)}>
                                                ×
                                            </Button>
                                        </Stack>
                                    ))}
                                </Stack>
                                <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                                    <CardActions sx={{ justifyContent: 'center', pt: 2 }}>
                                        <Button size="md" variant="solid" color="primary" onClick={submitSlots}>
                                            Submit Slots ({previewSlots.length})
                                        </Button>
                                    </CardActions>
                                </CardOverflow>
                            </Card>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </React.Fragment>

    );
}