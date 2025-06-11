/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, FormLabel, Select, Option, Sheet, Input, Modal, ModalDialog, ModalClose, Button } from '@mui/joy';
import React from 'react';
import { OfficeLocation, Speciality } from '../../types';
import { dataStore } from '../../stores';
import formatString from '../../misc/formatSpeciality';

type SearchProps = {
    selectedLocation: string;
    setSelectedLocation: (loc: string) => void;
    selectedSpeciality: string;
    setSelectedSpeciality: (spec: string) => void;
};

export default function Search({
    selectedLocation,
    setSelectedLocation,
    selectedSpeciality,
    setSelectedSpeciality,
}: SearchProps) {

    const [open, setOpen] = React.useState(false);

    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Specialty</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by speciality"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                    value={selectedSpeciality}
                    onChange={(_, value) => setSelectedSpeciality(value as string)}
                >
                    <Option value="all">All Specialities</Option>
                    {dataStore.specialitiesList.map((speciality: Speciality) => (
                        <Option key={speciality} value={speciality}>
                            {formatString(speciality)}
                        </Option>
                    ))}
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Location</FormLabel>
                <Select size="sm" placeholder="All" value={selectedLocation} onChange={(_, value) => setSelectedLocation(value as string)}>
                    <Option value="all">All Locations</Option>
                    <Option value={OfficeLocation.Athens}>Athens</Option>
                    <Option value={OfficeLocation.Patras}>Patra</Option>
                    <Option value={OfficeLocation.Thessaloniki}>Thessaloniki</Option>        </Select>
            </FormControl>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Search
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
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
                    <FormLabel>Search for doctors</FormLabel>
                    <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
                </FormControl>
                {renderFilters()}
            </Box>
        </React.Fragment>
    );
}