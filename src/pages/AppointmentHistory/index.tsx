/* eslint-disable jsx-a11y/anchor-is-valid */
import { ColorPaletteProp } from '@mui/joy/styles';
import { Box, Chip, Link, IconButton, iconButtonClasses, Typography, FormControl, FormLabel, Select, Option, Sheet, Input, Button, Table, Avatar } from '@mui/joy';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useAppointments, useDoctors } from '../../hooks';

export default function AppointmentHistory() {
    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Status</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="paid">Completed</Option>
                    <Option value="cancelled">Cancelled</Option>
                </Select>
            </FormControl>
        </React.Fragment>
    );

    // const [search, setSearch] = useState('');
    // const [open, setOpen] = useState(false);

    // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearch(event.target.value);
    //     console.log(event.target.value);
    // }

    const { appointments, loading } = useAppointments();
    const { doctors } = useDoctors();

    return (
        <React.Fragment>
            <SectionTitle title='History' subtitle='Find all your past appointments here' />
            {/* <ViewAppointmentModal open={open} /> */}
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
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Search for appointment</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
                </FormControl>
                {renderFilters()}
            </Box>
            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
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
                        {[...appointments].sort(
                            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map((row) => {
                                const doctor = doctors.find(doc => doc.id === row.doctorid);

                                return (

                                    <tr key={row.id}>
                                        <td>
                                            <Typography level="body-xs">A25-{row.id}</Typography>
                                        </td>
                                        <td>
                                            <Typography level="body-xs">{row.date}</Typography>
                                        </td>
                                        <td>
                                            <Typography level="body-xs">{row.time}</Typography>
                                        </td>
                                        <td>
                                            <Chip
                                                variant="soft"
                                                size="sm"
                                                startDecorator={
                                                    {
                                                        COMPLETED: <CheckRoundedIcon />,
                                                        CANCELLED: <BlockIcon />,
                                                        PENDING: <BlockIcon />,
                                                    }[row.status]
                                                }
                                                color={
                                                    {
                                                        COMPLETED: 'success',
                                                        CANCELLED: 'danger',
                                                        PENDING: 'warning',
                                                    }[row.status] as ColorPaletteProp
                                                }
                                            >
                                                {row.status}
                                            </Chip>
                                        </td>
                                        <td>
                                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                <Avatar size="sm">{doctor?.avatar}</Avatar>
                                                <div>
                                                    <Typography level="body-xs">{doctor?.fullname}</Typography>
                                                    <Typography level="body-xs">{doctor?.email}</Typography>
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
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    startDecorator={<KeyboardArrowLeftIcon />}
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />
                {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                    <IconButton
                        key={page}
                        size="sm"
                        variant={Number(page) ? 'outlined' : 'plain'}
                        color="neutral"
                    >
                        {page}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    endDecorator={<KeyboardArrowRightIcon />}
                >
                    Next
                </Button>
            </Box>
        </React.Fragment>
    );
}
