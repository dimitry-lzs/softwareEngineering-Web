/* eslint-disable jsx-a11y/anchor-is-valid */
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {ListItem, ListItemContent, ListItemDecorator, List, ListDivider, IconButton } from '@mui/joy';
import { useState } from 'react';


const listItems = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    doctor: {                    // doctor
      initial: 'O',              // his initial to show in avatar, his picture could be shown instead
      name: 'Olivia Ryhe',       // doctor name
      specialty: 'Cardiologist', // doctor specialty
      email: 'olivia@email.com', // doctor email
    },
  },
  {
    id: 'INV-1233',
    date: 'Feb 3, 2023',
    status: 'Pending',
    doctor: {
      initial: 'S',
      name: 'Steve Hampton',
      specialty: 'Cardiologist', 
      email: 'steve.hamp@email.com',
    },
  },
  {
    id: 'INV-1232',
    date: 'Feb 3, 2023',
    status: 'Completed',
    doctor: {
      initial: 'C',
      name: 'Ciaran Murray',
      specialty: 'Cardiologist', 
      email: 'ciaran.murray@email.com',
    },
  },
  {
    id: 'INV-1231',
    date: 'Feb 3, 2023',
    status: 'Completed',
    doctor: {
      initial: 'M',
      name: 'Maria Macdonald',
      specialty: 'Cardiologist', 
      email: 'maria.mc@email.com',
    },
  },
  {
    id: 'INV-1230',
    date: 'Feb 3, 2023', 
    status: 'Cancelled',
    doctor: { 
      initial: 'C', 
      name: 'Charles Fulton', 
      specialty: 'Cardiologist', 
      email: 'fulton@email.com', 
    },
  },
  {
    id: 'INV-1229',
    date: 'Feb 3, 2023',
    status: 'Cancelled',
    doctor: {
      initial: 'J',
      name: 'Jay Hooper',
      specialty: 'Cardiologist', 
      email: 'hooper@email.com',
    },
  },

];

// function RowMenu() {
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: IconButton }}
//         slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
//       >
//         <MoreHorizRoundedIcon />
//       </MenuButton>
//       <Menu size="sm" sx={{ minWidth: 140 }}>
//         <MenuItem>Edit</MenuItem>
//         <MenuItem>Rename</MenuItem>
//         <MenuItem>Move</MenuItem>
//         <Divider />
//         <MenuItem color="danger">Delete</MenuItem>
//       </Menu>
//     </Dropdown>
//   );
// }

export default function UpcomingAppointments() {
  const [currentPage, setCurrentPage] = useState(1); // current page
  const listItemsPerPage = 3;

  // Calculating the total number of pages given the number of items
  const startIndex = (currentPage - 1) * listItemsPerPage;
  const endIndex = startIndex + listItemsPerPage;
  
  const currentItems = listItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(listItems.length / listItemsPerPage);


  return (
    <Box sx={{ display: 'block', gap: 2, width: '450px', height: '500px', maxWidth: '100%'}}>
      {currentItems.map((listItem) => (
        <List key={listItem.id} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              width: '100%',
            }}
          >
            <ListItemContent 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                alignItems: 'start', 
                flex:1,
              }}
            >
              <ListItemDecorator>
                <Avatar size="sm">{listItem.doctor.initial}</Avatar>
              </ListItemDecorator>
              <div style={{ flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between', // Push date to the far left
                    alignItems: 'center', // Align items vertically
                    mb: 1, // Add margin below the row
                  }}
                >
                  <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    {listItem.doctor.name}
                  </Typography>
                  <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                    {listItem.date}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    direction: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs" gutterBottom sx={{display:'flex'}}>
                  {listItem.doctor.specialty}
                  </Typography>
                  <Typography level="body-xs" gutterBottom sx={{display:'flex'}}>
                    {listItem.doctor.email}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 1 
                  }}
                >
                  <Link level="body-sm" component="button" sx={{ml: 'auto'}}>
                    See details
                  </Link>
                </Box>
              </div>
            </ListItemContent>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{ display: 'flex', alignItems: 'center', py: 2 }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" sx={{ mx: 'auto' }}>
          Page {currentPage} of {totalPages > 0 ? totalPages : 1}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
