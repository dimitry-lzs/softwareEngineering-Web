import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { ListItem, ListItemContent, ListItemDecorator, List, Stack } from '@mui/joy';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAppointments } from '../../hooks';
import SmartAvatar from '../SmartAvatar';

interface UpcomingAppointmentsProps {
    isDoctor?: boolean;
}

export default function UpcomingAppointments({ isDoctor = false }: UpcomingAppointmentsProps) {
    const navigate = useNavigate();

    const { appointments } = useAppointments(!isDoctor); // Pass true for patient, false for doctor

    // Type guard to check if appointment has patient info
    const hasPatientInfo = (appointment: any): appointment is { patient_name: string; patient_phone: string } => {
        return 'patient_name' in appointment && 'patient_phone' in appointment;
    };

    // Type guard to check if appointment has doctor info
    const hasDoctorInfo = (appointment: any): appointment is { doctor_name?: string; doctor_specialty?: string; doctor_avatar?: string } => {
        return 'doctor_name' in appointment || 'doctor_specialty' in appointment;
    };

    // Helper functions for patient display
    const getPatientDisplayName = (appointment: any) => {
        // Use patient_name from the upcoming appointments API
        if (hasPatientInfo(appointment) && appointment.patient_name.trim()) {
            return appointment.patient_name;
        }
        return `Patient #${appointment?.patientid || 'Unknown'}`;
    };

    const filteredAppointments = useMemo(() => {
        return appointments.filter(appointment =>
            appointment.status === 'PENDING'
        );
    }, [appointments]);

    return (
        <Box sx={{ width: '100%', flexGrow: 1 }}>
            {filteredAppointments.length < 1
                ? (
                    <Stack direction="column"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            pt: 16,
                            px: 4
                        }}
                    >
                        <Typography level="h3">
                            No Upcoming Appointments
                        </Typography>
                        <Typography color="neutral" level="body-md">
                            Once you have appointments they will be shown here
                        </Typography>
                    </Stack>
                ) : (
                    <>
                        {
                            filteredAppointments.map((appointment) => (
                                <List key={appointment.appointmentid} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
                                    <ListItem
                                        sx={{
                                            borderRadius: '12px',
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            mb: 1,
                                            bgcolor: 'background.surface',
                                            '&:hover': {
                                                bgcolor: 'background.level1',
                                                borderColor: 'primary.outlinedBorder',
                                                transform: 'translateY(-1px)',
                                                boxShadow: 'sm',
                                                transition: 'all 0.2s ease-in-out'
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                            p: 2
                                        }}
                                    >
                                        <ListItemContent>

                                            <Stack direction="column" sx={{ display: 'flex' }}>

                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <ListItemDecorator>
                                                        <SmartAvatar
                                                            size="lg"
                                                            src={isDoctor ? appointment.patient_avatar : (hasDoctorInfo(appointment) ? appointment.doctor_avatar : undefined)}
                                                            name={isDoctor ?
                                                                getPatientDisplayName(appointment) :
                                                                (hasDoctorInfo(appointment) ? (appointment.doctor_name || 'Unknown Doctor') : 'Unknown Doctor')
                                                            }
                                                            sx={{
                                                                bgcolor: isDoctor ? 'primary.softBg' : 'success.softBg',
                                                                color: isDoctor ? 'primary.solidColor' : 'success.solidColor',
                                                                fontWeight: 'bold',
                                                                borderRadius: '50%',
                                                                width: 48,
                                                                height: 48
                                                            }}
                                                        />
                                                    </ListItemDecorator>

                                                    <Stack direction="column" sx={{ flex: 1 }}>
                                                        <Stack direction="row" alignItems="center" spacing={1}>
                                                            <Typography level="title-md" sx={{ fontWeight: 600 }}>
                                                                {isDoctor ?
                                                                    getPatientDisplayName(appointment) :
                                                                    (hasDoctorInfo(appointment) ? appointment.doctor_name : 'Unknown Doctor')
                                                                }
                                                            </Typography>
                                                            {!isDoctor && hasDoctorInfo(appointment) && (
                                                                <Typography
                                                                    level="body-xs"
                                                                    sx={{
                                                                        color: 'primary.500',
                                                                        bgcolor: 'primary.softBg',
                                                                        borderRadius: '12px',
                                                                        px: 1.5,
                                                                        py: 0.25,
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    {appointment.doctor_specialty}
                                                                </Typography>
                                                            )}
                                                        </Stack>

                                                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                                                            <Typography level="body-sm" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                                📅 {new Date(appointment.slot_timefrom).toLocaleDateString('en-US', {
                                                                    weekday: 'short',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </Typography>
                                                            <Typography level="body-sm" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                                                🕐 {new Date(appointment.slot_timefrom).toLocaleTimeString('en-US', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                })}
                                                            </Typography>
                                                            {isDoctor && hasPatientInfo(appointment) && appointment.patient_phone && (
                                                                <Typography
                                                                    level="body-xs"
                                                                    sx={{
                                                                        color: 'success.600',
                                                                        bgcolor: 'success.softBg',
                                                                        borderRadius: '12px',
                                                                        px: 1.5,
                                                                        py: 0.25,
                                                                        fontWeight: 500
                                                                    }}
                                                                >
                                                                    📞 {appointment.patient_phone}
                                                                </Typography>
                                                            )}
                                                        </Stack>
                                                    </Stack>

                                                    <Link
                                                        level="body-sm"
                                                        component="button"
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: 'primary.500',
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                color: 'primary.600',
                                                                textDecoration: 'underline'
                                                            }
                                                        }}
                                                        onClick={() => navigate(
                                                            isDoctor ?
                                                                `/doctor-home/${appointment.appointmentid}` :
                                                                `/my-appointments/${appointment.appointmentid}`
                                                        )}
                                                    >
                                                        View details →
                                                    </Link>
                                                </Stack>
                                            </Stack>
                                        </ListItemContent>
                                    </ListItem>
                                </List>
                            ))
                        }
                    </>
                )}
        </Box>
    );
}
