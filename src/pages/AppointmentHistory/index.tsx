/* eslint-disable jsx-a11y/anchor-is-valid */
import { ColorPaletteProp } from '@mui/joy/styles';
import { Box, Chip, Link, Typography, FormControl, FormLabel, Select, Option, Sheet, Table, Stack } from '@mui/joy';
import SmartAvatar from '../../components/SmartAvatar';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import React, { useEffect, useMemo, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useAppointments } from '../../hooks';
import { useNavigate } from 'react-router';

export default function AppointmentHistory() {

    const { appointments } = useAppointments(true);
    const [status, setStatus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Appointments:', appointments);
    }, [appointments]);

    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    onChange={(_, value) => {
                        if (typeof value === 'string') {
                            setStatus(value);
                        } else {
                            setStatus('');
                        }
                    }}
                >
                    <Option value="">All</Option>
                    <Option value="COMPLETED">Completed</Option>
                    <Option value="CANCELLED">Cancelled</Option>
                </Select>
            </FormControl>
        </React.Fragment>
    );

    const filteredAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            if (status === '') {
                console.log(appointment.slot_timefrom);
                return appointment.status === 'COMPLETED' || appointment.status === 'CANCELLED';
            }
            return appointment.status === status;

        });
    }, [appointments, status]);

    return (
        <React.Fragment>
            <SectionTitle title='History' subtitle='Find all your past appointments here' />
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                {renderFilters()}
            </Box>
            {filteredAppointments.length < 1
                ?
                (
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
                            No Past Appointments
                        </Typography>
                        <Typography color="neutral" level="body-md">
                            Once you have past appointments they will be shown here
                        </Typography>
                    </Stack>
                )

                : (
                    <Sheet
                        className="OrderTableContainer"
                        variant="outlined"
                        sx={{
                            display: { xs: 'none', sm: 'initial' },
                            width: '100%',
                            borderRadius: 'sm',
                        }}
                    >
                        <Table
                            aria-labelledby="tableTitle"
                            stickyHeader
                            hoverRow
                            sx={{
                                '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                                '--Table-headerUnderlineThickness': '1px',
                                '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                                '--TableCell-paddingY': '4px',
                                '--TableCell-paddingX': '8px',
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: 70, padding: '12px 6px' }}></th>
                                    <th style={{ width: 120, padding: '12px 6px' }}>Date</th>
                                    <th style={{ width: 140, padding: '12px 6px' }}>Time</th>
                                    <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
                                    <th style={{ width: 240, padding: '12px 6px' }}>Doctor</th>
                                    <th style={{ width: 140, padding: '12px 6px' }}> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...filteredAppointments]
                                    .sort(
                                        (a, b) => new Date(b.slot_timefrom).getTime() - new Date(a.slot_timefrom).getTime())
                                    .map((appointment) => {
                                        const date = new Date(appointment.slot_timefrom);
                                        const appointmentDate = date.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        });
                                        const appointmentTime = date.toLocaleTimeString('en-US', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        });
                                        return (

                                            <tr style={{ cursor: 'pointer' }} key={appointment.appointmentid} onClick={() => navigate(`/history/${appointment.appointmentid}`)}>
                                                <td>
                                                    <Typography level="body-xs">A25-{appointment.appointmentid}</Typography>
                                                </td>
                                                <td>
                                                    <Typography level="body-xs">{appointmentDate}</Typography>
                                                </td>
                                                <td>
                                                    <Typography level="body-xs">{appointmentTime}</Typography>
                                                </td>
                                                <td>
                                                    <Chip
                                                        variant="soft"
                                                        size="sm"
                                                        startDecorator={
                                                            {
                                                                COMPLETED: <CheckRoundedIcon />,
                                                                CANCELLED: <BlockIcon />,
                                                                PENDING: <HourglassEmptyIcon />,
                                                            }[appointment.status]
                                                        }
                                                        color={
                                                            {
                                                                COMPLETED: 'success',
                                                                CANCELLED: 'danger',
                                                                PENDING: 'warning',
                                                            }[appointment.status] as ColorPaletteProp
                                                        }
                                                    >
                                                        {appointment.status}
                                                    </Chip>
                                                </td>
                                                <td>
                                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                        <SmartAvatar
                                                            size="sm"
                                                            src={appointment?.doctor_avatar}
                                                            name={appointment.doctor_name || 'Unknown Doctor'}
                                                            sx={{ borderRadius: '50%' }}
                                                        />
                                                        <div>
                                                            <Typography level="body-xs">{appointment.doctor_name}</Typography>
                                                            <Typography level="body-xs">({appointment.doctor_specialty?.toLowerCase() || 'Unknown Specialty'})</Typography>
                                                        </div>
                                                    </Box>
                                                </td>
                                                <td>
                                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                        <Link level="body-xs" component="button">
                                                            View Appointment
                                                        </Link>
                                                    </Box>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </Sheet>
                )
            }
        </React.Fragment>
    );
}
