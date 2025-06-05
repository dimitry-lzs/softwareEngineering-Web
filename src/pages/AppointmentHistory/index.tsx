/* eslint-disable jsx-a11y/anchor-is-valid */
import { ColorPaletteProp } from '@mui/joy/styles';
import { Box, Avatar, Chip, Link, IconButton, iconButtonClasses, Typography, FormControl, FormLabel, Select, Option, Sheet, Input, Button, Table } from '@mui/joy';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import SectionTitle from '../../components/SectionTitle';

const rows = Array.from({ length: 10 }, (_, i) => {
    const id = i + 1;
    const date = new Date(2023, 9, 1 + (id % 30)); // October 2023
    const time = `${(8 + (id % 10)) % 12 || 12}:00 ${id % 2 === 0 ? "AM" : "PM"}`;
    const statuses = ["Completed", "Cancelled"];
    const names = [
        "John Doe", "Jane Smith", "Alice Brown", "Bob White", "Charlie Black",
        "David Johnson", "Eva Green", "Frank Lee", "Grace Kim", "Harry Liu"
    ];
    const name = names[id % names.length];
    const [first, last] = name.split(" ");
    const email = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;

    return {
        serialId: id.toString(),
        date: date.toISOString().split("T")[0],
        time,
        status: statuses[id % statuses.length],
        customer: {
            name,
            email,
            initial: `${first[0]}${last[0]}`,
        },
    };
});


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
                        {[...rows].sort(
                            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                        ).map((row) => (
                            <tr key={row.date}>
                                <td>
                                    <Typography level="body-xs">A25-{row.serialId}</Typography>
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
                                                Completed: <CheckRoundedIcon />,
                                                Cancelled: <BlockIcon />,
                                            }[row.status]
                                        }
                                        color={
                                            {
                                                Completed: 'success',
                                                Cancelled: 'danger',
                                            }[row.status] as ColorPaletteProp
                                        }
                                    >
                                        {row.status}
                                    </Chip>
                                </td>
                                <td>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Avatar size="sm">{row.customer.initial}</Avatar>
                                        <div>
                                            <Typography level="body-xs">{row.customer.name}</Typography>
                                            <Typography level="body-xs">{row.customer.email}</Typography>
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
                        ))}
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
