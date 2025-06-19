import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { ListItem, ListItemContent, ListItemDecorator, List, ListDivider, Stack } from '@mui/joy';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAppointments } from '../../hooks';


export default function UpcomingAppointments() {
    const navigate = useNavigate();

    const { appointments } = useAppointments();

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
                                    <ListItem>
                                        <ListItemContent>

                                            <Stack direction="column" sx={{ display: 'flex' }}>

                                                <Stack direction="row" spacing={1}>
                                                    <ListItemDecorator>
                                                        <Avatar size="lg" sx={{ mr: 0.5 }}>
                                                            {
                                                                appointment?.doctor_avatar ? (
                                                                    <img alt="" src={appointment.doctor_avatar} />
                                                                ) : (
                                                                    appointment.doctor_name ? appointment.doctor_name.slice(0, 1) : '?'
                                                                )
                                                            }
                                                        </Avatar>
                                                    </ListItemDecorator>

                                                    <Stack direction="row" alignItems="center" justifyContent="flex-start">
                                                        <Typography level="title-md" sx={{ fontWeight: 600 }}>
                                                            {appointment.doctor_name}
                                                        </Typography>
                                                        <Typography level="title-sm" variant="outlined" sx={{ color: 'text.tertiary', ml: 0.5, borderRadius: 18, px: 1 }}>
                                                            {appointment.doctor_specialty}
                                                        </Typography>
                                                    </Stack>


                                                    <Stack direction="row" alignItems="center" justifyContent="flex-end">
                                                        <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                                                            {new Date(appointment.slot_timeFrom).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })
                                                            }
                                                        </Typography>
                                                        <Typography level="body-sm" sx={{ ml: 0.5, color: 'text.tertiary' }}>
                                                            - {new Date(appointment.slot_timeFrom).toLocaleTimeString('en-US', {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}
                                                        </Typography>
                                                    </Stack>

                                                </Stack>

                                                <Link
                                                    level="body-sm"
                                                    component="button"
                                                    mb={0.5}
                                                    sx={{ ml: 'auto' }}
                                                    onClick={() => navigate(`/calendar/${appointment.appointmentid}`)}               >
                                                    See details
                                                </Link>
                                            </Stack>
                                        </ListItemContent>
                                    </ListItem>
                                    <ListDivider />
                                </List>
                            ))
                        }
                    </>
                )}
        </Box>
    );
}
