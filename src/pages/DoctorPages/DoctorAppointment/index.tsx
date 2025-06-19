import { Box, Button, Card, CardActions, CardOverflow, Chip, Divider, FormControl, FormLabel, Stack, Textarea, Typography, Avatar } from "@mui/joy";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SectionTitle from "../../../components/SectionTitle";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppointment, useSaveDiagnosis } from '../../../hooks';
import { useState, useEffect } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';

export default function DoctorAppointment() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { appointment, loading } = useAppointment(id, true); // true for doctor context
    const { saveDiagnosis, loading: savingDiagnosis } = useSaveDiagnosis();

    const [diagnosis, setDiagnosis] = useState('');
    const [diagnosisDetails, setDiagnosisDetails] = useState('');

    // Determine where to navigate back based on current path
    const isFromHome = location.pathname.startsWith('/doctor-home/');
    const backPath = isFromHome ? '/doctor-home' : '/doctor-appointments';
    const backText = isFromHome ? 'Back to Home' : 'Back to Appointments';

    // Load existing diagnosis if available
    useEffect(() => {
        if (appointment) {
            setDiagnosis(appointment.diagnosis_decease || '');
            setDiagnosisDetails(appointment.diagnosis_details || '');
        }
    }, [appointment]);

    if (loading) {
        return <Box>Loading...</Box>;
    }

    if (!appointment) {
        return <Box>Appointment not found</Box>;
    }

    const handleSaveDiagnosis = async () => {
        if (!appointment || !diagnosis.trim()) return;

        const success = await saveDiagnosis(
            appointment.appointmentid.toString(),
            diagnosis,
            diagnosisDetails
        );

        if (success) {
            // Optionally refresh the appointment data or navigate back
            // fetchAppointment could be called here if needed
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const getStatusColor = (status: string): ColorPaletteProp => {
        switch (status) {
            case 'COMPLETED': return 'success';
            case 'CANCELLED': return 'danger';
            case 'PENDING': return 'warning';
            default: return 'neutral';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return <CheckRoundedIcon />;
            case 'CANCELLED': return <BlockIcon />;
            case 'PENDING': return <HourglassEmptyIcon />;
            default: return null;
        }
    };

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <SectionTitle
                title="Appointment Details"
                subtitle="View and manage appointment information"
            />

            <Stack
                spacing={2}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                {/* Appointment Details Card */}
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">
                            Appointment A25-{appointment.appointmentid}
                        </Typography>
                    </Box>

                    <Divider />

                    <Stack direction="row" spacing={4} sx={{ my: 2 }}>
                        {/* Appointment Info */}
                        <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
                            <FormControl>
                                <FormLabel>Patient</FormLabel>
                                <Typography level="body-sm">{appointment.patient_name || 'Unknown Patient'}</Typography>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <Typography level="body-sm">{formatDate(appointment.slot_timeFrom)}</Typography>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Time</FormLabel>
                                <Typography level="body-sm">{formatTime(appointment.slot_timeFrom)}</Typography>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Reason</FormLabel>
                                <Typography level="body-sm">{appointment.reason || 'No reason provided'}</Typography>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <Chip
                                    variant="soft"
                                    size="sm"
                                    startDecorator={getStatusIcon(appointment.status)}
                                    color={getStatusColor(appointment.status)}
                                >
                                    {appointment.status}
                                </Chip>
                            </FormControl>
                        </Stack>

                        <Divider orientation="vertical" />

                        {/* Patient Contact Info */}
                        <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
                            <Typography level="title-sm">Patient Information</Typography>

                            <Stack alignItems="center" spacing={1}>
                                <Avatar size="lg">
                                    {appointment.patient_name?.charAt(0)?.toUpperCase() || 'P'}
                                </Avatar>
                                <Typography level="body-sm" sx={{ fontWeight: 'bold' }}>
                                    {appointment.patient_name || 'Unknown Patient'}
                                </Typography>
                            </Stack>

                            <FormControl>
                                <FormLabel>Phone</FormLabel>
                                <Typography level="body-sm">{appointment.patient_phone || 'No phone provided'}</Typography>
                            </FormControl>
                        </Stack>
                    </Stack>

                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button
                                size="sm"
                                variant="outlined"
                                color="neutral"
                                onClick={() => navigate(backPath)}
                            >
                                {backText}
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>

                {/* Diagnosis Card - Show for COMPLETED appointments */}
                {appointment.status === 'COMPLETED' && (
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Diagnosis</Typography>
                            <Typography level="body-sm">
                                {appointment.diagnosis_decease || appointment.diagnosis_details
                                    ? "View or update diagnosis information for this appointment"
                                    : "Add diagnosis information for this appointment"
                                }
                            </Typography>
                        </Box>
                        <Divider />

                        {/* Show existing diagnosis if available */}
                        {(appointment.diagnosis_decease || appointment.diagnosis_details) && (
                            <>
                                <Stack spacing={2} sx={{ my: 2 }}>
                                    <Typography level="title-sm">Current Diagnosis</Typography>

                                    {appointment.diagnosis_decease && (
                                        <FormControl>
                                            <FormLabel>Diagnosis</FormLabel>
                                            <Typography level="body-sm" sx={{
                                                p: 1.5,
                                                bgcolor: 'background.level1',
                                                borderRadius: 'sm',
                                                border: '1px solid',
                                                borderColor: 'divider'
                                            }}>
                                                {appointment.diagnosis_decease}
                                            </Typography>
                                        </FormControl>
                                    )}

                                    {appointment.diagnosis_details && (
                                        <FormControl>
                                            <FormLabel>Diagnosis Details</FormLabel>
                                            <Typography level="body-sm" sx={{
                                                p: 1.5,
                                                bgcolor: 'background.level1',
                                                borderRadius: 'sm',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                whiteSpace: 'pre-wrap'
                                            }}>
                                                {appointment.diagnosis_details}
                                            </Typography>
                                        </FormControl>
                                    )}
                                </Stack>
                                <Divider />
                            </>
                        )}

                        <Stack spacing={2} sx={{ my: 2 }}>
                            <Typography level="title-sm">
                                {appointment.diagnosis_decease || appointment.diagnosis_details
                                    ? "Update Diagnosis"
                                    : "Add Diagnosis"
                                }
                            </Typography>

                            <FormControl>
                                <FormLabel>Diagnosis</FormLabel>
                                <Textarea
                                    placeholder="Enter diagnosis..."
                                    minRows={2}
                                    value={diagnosis}
                                    onChange={(e) => setDiagnosis(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Diagnosis Details</FormLabel>
                                <Textarea
                                    placeholder="Enter detailed diagnosis information..."
                                    minRows={4}
                                    value={diagnosisDetails}
                                    onChange={(e) => setDiagnosisDetails(e.target.value)}
                                />
                            </FormControl>
                        </Stack>

                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    startDecorator={<CheckRoundedIcon />}
                                    onClick={handleSaveDiagnosis}
                                    disabled={!diagnosis.trim()}
                                    loading={savingDiagnosis}
                                >
                                    Save Diagnosis
                                </Button>
                            </CardActions>
                        </CardOverflow>
                    </Card>
                )}

                {/* Information Card for CANCELLED appointments */}
                {appointment.status === 'CANCELLED' && (
                    <Card variant="soft" color="danger">
                        <Typography level="body-sm" color="danger">
                            This appointment was cancelled and cannot be modified.
                        </Typography>
                    </Card>
                )}
            </Stack>
        </Box>
    );
}