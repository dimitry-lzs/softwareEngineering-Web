/* eslint-disable jsx-a11y/anchor-is-valid */
// import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
// import Avatar from '@mui/joy/Avatar';
// import Chip from '@mui/joy/Chip';
// import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
// import Menu from '@mui/joy/Menu';
// import MenuButton from '@mui/joy/MenuButton';
// import MenuItem from '@mui/joy/MenuItem';
// import Dropdown from '@mui/joy/Dropdown';
// import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
// import BlockIcon from '@mui/icons-material/Block';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, FormLabel, Select, Option, Sheet, Input, Modal, ModalDialog, ModalClose, Button } from '@mui/joy';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from 'react';


// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//     if (b[orderBy] < a[orderBy]) {
//       return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//       return 1;
//     }
//     return 0;
//   }

// type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy: Key,
//   ): (
//     a: { [key in Key]: number | string },
//     b: { [key in Key]: number | string },
//   ) => number {
//     return order === 'desc'
//       ? (a, b) => descendingComparator(a, b, orderBy)
//       : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function RowMenu() {
//     return (
//         <Dropdown>
//         <MenuButton
//             slots={{ root: IconButton }}
//             slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
//         >
//             <MoreHorizRoundedIcon />
//         </MenuButton>
//         <Menu size="sm" sx={{ minWidth: 140 }}>
//             <MenuItem>Edit</MenuItem>
//             <MenuItem>Rename</MenuItem>
//             <MenuItem>Move</MenuItem>
//             <Divider />
//             <MenuItem color="danger">Delete</MenuItem>
//         </Menu>
//         </Dropdown>
//     );
// }

export default function Search() {
    // const [order, setOrder] = React.useState<Order>('desc');
    // const [selected, setSelected] = React.useState<readonly string[]>([]);

    const [open, setOpen] = React.useState(false);
    const renderFilters = () => (
        <React.Fragment>
            <FormControl size="sm">
                <FormLabel>Specialty</FormLabel>
                <Select
                    size="sm"
                    placeholder="Filter by status"
                    slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                >
                    <Option value="cardiologist"></Option>
                    <Option value="dermatologist">Dermatologist</Option>
                    <Option value="endocrynologist">Endocrynologist</Option>
                    <Option value="gynecologist">Gynecologist</Option>
                    <Option value="neurologist">Neurologist</Option>
                    <Option value="oncologist">Oncologist</Option>
                    <Option value="orthopedist">Orthopedist</Option>
                    <Option value="otorhynolaryngologist">Otorhynolarygologist</Option>
                    <Option value="pediatrician">Pediatrician</Option>
                    <Option value="psychiatrist">Psychiatrist</Option>
                    <Option value="radiologist">Radiologist</Option>
                    <Option value="urologist">Urologist</Option>
                    <Option value="ornithologist">Ornithologist</Option>
                </Select>
            </FormControl>
            <FormControl size="sm">
                <FormLabel>Location</FormLabel>
                <Select size="sm" placeholder="All">
                    <Option value="athens">Athens</Option>
                    <Option value="patra">Patra</Option>
                    <Option value="thessaloniki">Thessaloniki</Option>        </Select>
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