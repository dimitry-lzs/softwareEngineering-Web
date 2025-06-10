import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ListItem, ListItemContent, ListItemDecorator, List, ListDivider, IconButton, Stack } from '@mui/joy';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppointments } from '../../hooks';


const listItems = [
  {
    id: 'INV-1234',
    date: 'Feb 3, 2023',
    time: '2:00',
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
    time: '2:00',
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
    time: '2:00',
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
    time: '2:00',
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
    time: '2:00',
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
    time: '2:00',
    status: 'Cancelled',
    doctor: {
      initial: 'J',
      name: 'Jay Hooper',
      specialty: 'Cardiologist',
      email: 'hooper@email.com',
    },
  },

];

export default function UpcomingAppointments() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // current page
  const listItemsPerPage = 4;

  const { appointments } = useAppointments();
  // Calculating the total number of pages given the number of items
  const startIndex = (currentPage - 1) * listItemsPerPage;
  const endIndex = startIndex + listItemsPerPage;

  //  const currentItems = listItems.slice(startIndex, endIndex);

  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment =>
      appointment.status === 'PENDING'
    );
  }, [appointments]);

  const totalPages = Math.ceil(listItems.length / listItemsPerPage);


  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      {filteredAppointments.map((appointment) => (
        <List key={appointment.appointmentid} size="sm" sx={{ '--ListItem-paddingX': 0 }}>
          <ListItem>
            <ListItemContent>

              <Stack direction="column" sx={{ display: 'flex' }}>

                <Stack direction="row" spacing={1}>


                  <ListItemDecorator>
                    <Avatar size="lg" sx={{ mr: 0.5 }}>{appointment.doctor_name.slice(0,1)}</Avatar>
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
                      {appointment.slot_timefrom}
                    </Typography>
                    <Typography level="body-sm" sx={{ ml: 0.5, color: 'text.tertiary' }}>
                      - {appointment.slot_timefrom}
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
