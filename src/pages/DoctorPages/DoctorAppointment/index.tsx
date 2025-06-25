import { Box, Button, Card, CardActions, CardOverflow, Chip, Divider, FormControl, FormLabel, Stack, Textarea, Typography, Avatar } from "@mui/joy";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AddIcon from '@mui/icons-material/Add';
import SectionTitle from "../../../components/SectionTitle";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppointment, useAddDiagnosis, useCompleteAppointment } from '../../../hooks';
import { usePatient } from '../../../hooks';
import { useState, useEffect } from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';

export default function DoctorAppointment() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { appointment, loading, fetchAppointment } = useAppointment(id, true); // true for doctor context
    const { patient } = usePatient((appointment?.patientid)?.toString());
    const { addDiagnosis, loading: addingDiagnosis } = useAddDiagnosis();
    const { completeAppointment, loading: completingAppointment } = useCompleteAppointment();

    const [diagnosis, setDiagnosis] = useState('');
    const [diagnosisDetails, setDiagnosisDetails] = useState('');

    // Determine where to navigate back based on current path
    const isFromHome = location.pathname.startsWith('/doctor-home/');
    const backPath = isFromHome ? '/doctor-home' : '/doctor-appointments';
    const backText = isFromHome ? 'Back to Home' : 'Back to Appointments';

    // Helper function to get patient display name
    const getPatientDisplayName = () => {
        if (patient?.fullname && patient.fullname.trim()) {
            return patient.fullname;
        }
        return `Patient #${appointment?.patientid || 'Unknown'}`;
    };

    // Helper function to get patient initials
    const getPatientInitials = () => {
        if (patient?.fullname && patient.fullname.trim()) {
            return patient.fullname
                .split(' ')
                .map((name: string) => name[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return 'P';
    };

    // Load existing diagnosis if available
    useEffect(() => {
        if (appointment) {
            // Clear form when appointment changes
            setDiagnosis('');
            setDiagnosisDetails('');
        }
    }, [appointment]);

    if (loading) {
        return <Box>Loading...</Box>;
    }

    if (!appointment) {
        return <Box>Appointment not found</Box>;
    }

    const handleAddDiagnosis = async () => {
        if (!appointment || !diagnosis.trim()) return;

        const appointmentId = appointment.appointmentid;
        if (!appointmentId) return;

        const success = await addDiagnosis(
            appointmentId.toString(),
            diagnosis,
            diagnosisDetails
        );

        if (success) {
            // Clear the form
            setDiagnosis('');
            setDiagnosisDetails('');
            // Refresh appointment data
            if (fetchAppointment) {
                fetchAppointment(appointmentId.toString());
            }
        }
    };

    const handleCompleteAppointment = async () => {
        if (!appointment) return;

        const appointmentId = appointment.appointmentid;
        if (!appointmentId) return;

        const success = await completeAppointment(appointmentId.toString());

        if (success) {
            // Refresh appointment data to show updated status
            if (fetchAppointment) {
                fetchAppointment(appointmentId.toString());
            }
        }
    };

    // Check if there are existing diagnoses
    const hasExistingDiagnosis = () => {
        return appointment?.diagnoses && appointment.diagnoses.length > 0;
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
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar
                                        size="sm"
                                        src={patient?.avatar}
                                        sx={{
                                            bgcolor: 'primary.softBg',
                                            color: 'primary.solidColor',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {getPatientInitials()}
                                    </Avatar>
                                    <Typography level="body-sm">{getPatientDisplayName()}</Typography>
                                </Stack>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Date</FormLabel>
                                <Typography level="body-sm">{formatDate(appointment.slot_timefrom)}</Typography>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Time</FormLabel>
                                <Typography level="body-sm">{formatTime(appointment.slot_timefrom)}</Typography>
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
                                <Avatar
                                    size="lg"
                                    src={patient?.avatar}
                                    sx={{
                                        bgcolor: 'primary.softBg',
                                        color: 'primary.solidColor',
                                        fontWeight: 'bold',
                                        fontSize: '1.2rem'
                                    }}
                                >
                                    {getPatientInitials()}
                                </Avatar>
                                <Typography level="body-sm" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    {getPatientDisplayName()}
                                </Typography>
                                {patient?.email && (
                                    <Typography level="body-xs" sx={{ color: 'text.tertiary', textAlign: 'center' }}>
                                        {patient.email}
                                    </Typography>
                                )}
                            </Stack>

                            <FormControl>
                                <FormLabel>Contact Information</FormLabel>
                                <Stack spacing={1}>
                                    {patient?.phone ? (
                                        <Typography level="body-sm">
                                            📞 {patient.phone}
                                        </Typography>
                                    ) : (
                                        <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                                            📞 No phone provided
                                        </Typography>
                                    )}
                                    {patient?.email ? (
                                        <Typography level="body-sm">
                                            ✉️ {patient.email}
                                        </Typography>
                                    ) : (
                                        <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                                            ✉️ No email provided
                                        </Typography>
                                    )}
                                    {patient?.amka && (
                                        <Typography level="body-sm">
                                            🆔 AMKA: {patient.amka}
                                        </Typography>
                                    )}
                                </Stack>
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

                {/* Diagnosis Card - Show for PENDING and COMPLETED appointments */}
                {(appointment.status === 'PENDING' || appointment.status === 'COMPLETED') && (
                    <Card>
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">
                                {appointment.status === 'PENDING' ? 'Add Diagnosis' : 'Diagnoses'}
                            </Typography>
                            <Typography level="body-sm">
                                {appointment.status === 'PENDING'
                                    ? "Add diagnosis information for this appointment"
                                    : appointment.diagnoses && appointment.diagnoses.length > 0
                                        ? "View existing diagnoses and add new ones"
                                        : "Add diagnosis information for this appointment"
                                }
                            </Typography>
                        </Box>
                        <Divider />

                        {/* Show existing diagnoses if available */}
                        {appointment.diagnoses && appointment.diagnoses.length > 0 && (
                            <>
                                <Stack spacing={2} sx={{ my: 2 }}>
                                    <Typography level="title-sm">Existing Diagnoses ({appointment.diagnoses.length})</Typography>

                                    {appointment.diagnoses.map((diagnosis, index) => (
                                        <Card key={index} variant="outlined" sx={{ bgcolor: 'background.level1' }}>
                                            <Stack spacing={1} sx={{ p: 2 }}>
                                                <FormControl>
                                                    <FormLabel sx={{ fontSize: 'sm', fontWeight: 'bold' }}>
                                                        Diagnosis #{index + 1}
                                                    </FormLabel>
                                                    <Typography level="body-sm" sx={{
                                                        p: 1,
                                                        bgcolor: 'background.surface',
                                                        borderRadius: 'sm',
                                                        border: '1px solid',
                                                        borderColor: 'divider'
                                                    }}>
                                                        {diagnosis.decease}
                                                    </Typography>
                                                </FormControl>

                                                {diagnosis.details && (
                                                    <FormControl>
                                                        <FormLabel sx={{ fontSize: 'sm', fontWeight: 'bold' }}>
                                                            Details
                                                        </FormLabel>
                                                        <Typography level="body-sm" sx={{
                                                            p: 1,
                                                            bgcolor: 'background.surface',
                                                            borderRadius: 'sm',
                                                            border: '1px solid',
                                                            borderColor: 'divider',
                                                            whiteSpace: 'pre-wrap'
                                                        }}>
                                                            {diagnosis.details}
                                                        </Typography>
                                                    </FormControl>
                                                )}
                                            </Stack>
                                        </Card>
                                    ))}
                                </Stack>
                            </>
                        )}

                        {appointment.status === 'PENDING' && <>
                            <Divider />
                            <Stack spacing={2} sx={{ my: 2 }}>
                                <Typography level="title-sm">
                                    {(appointment?.diagnoses?.length || 0) > 1
                                        ? "Add New Diagnosis"
                                        : "Add Additional Diagnosis"
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
                                    {appointment.status === 'PENDING' ? (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            startDecorator={<AddIcon />}
                                            onClick={handleAddDiagnosis}
                                            disabled={!diagnosis.trim()}
                                            loading={addingDiagnosis}
                                        >
                                            Add Diagnosis
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="solid"
                                            startDecorator={<AddIcon />}
                                            onClick={handleAddDiagnosis}
                                            disabled={!diagnosis.trim()}
                                            loading={addingDiagnosis}
                                        >
                                            Add Additional Diagnosis
                                        </Button>
                                    )}
                                </CardActions>
                            </CardOverflow></>}
                    </Card>
                )}

                {/* Complete Appointment Card - Show for PENDING appointments that have at least one diagnosis */}
                {appointment.status === 'PENDING' && hasExistingDiagnosis() && (
                    <Card variant="soft" color="success">
                        <Box sx={{ mb: 1 }}>
                            <Typography level="title-md">Complete Appointment</Typography>
                            <Typography level="body-sm">
                                Mark this appointment as completed. This action cannot be undone.
                            </Typography>
                        </Box>
                        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    color="success"
                                    startDecorator={<MedicalServicesIcon />}
                                    onClick={handleCompleteAppointment}
                                    loading={completingAppointment}
                                >
                                    Complete Appointment
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