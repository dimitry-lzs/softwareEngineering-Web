import { RouterProvider, redirect } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { Fragment } from 'react/jsx-runtime';
import App from './app/App';
import CheckAuth from './components/CheckAuth';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AppointmentHistory from './pages/AppointmentHistory';
import Calendar from './pages/Calendar';
// import Doctors from './pages/Doctors';
import ErrorPage from './pages/Error';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
// import Doctor from './pages/Doctor';
import Appointment from './pages/Appointment';
import AppointmentFeedback from './pages/AppointmentFeedback';
import BookAppointment from './pages/Home/bookAppointment';
import DoctorHome from './pages/DoctorPages/DoctorHome';
import SetAvailabilities from './pages/DoctorPages/SetAvailabilities';
import DoctorAppointmentHistory from './pages/DoctorPages/DoctorAppointmentHistory';
import DoctorProfile from './pages/DoctorPages/DoctorProfile';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <CheckAuth Element={App} redirectTo='/auth' requireAuth={true} />
        ),
        children: [
            {
                index: true,
                element: <Fragment />,
                loader: () => redirect('home'),
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/home/:id',
                element: <BookAppointment />,
            },
            {
                path: '/calendar',
                element: <Calendar />,
            },
            {
                path: '/calendar/:id',
                element: <Appointment />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/history',
                element: <AppointmentHistory />,
            },
            {
                path: '/history/:id',
                element: <Appointment />,
            },
            {
                path: '/history/:id/feedback',
                element: <AppointmentFeedback />,
            },
            {
                path: '/doctor-home',
                element: <DoctorHome />,
            },
            {
                path: '/availabilities',
                element: <SetAvailabilities />,
            },
            {
                path: '/doctor-history',
                element: <DoctorAppointmentHistory />,
            },
            {
                path: '/doctor-profile',
                element: <DoctorProfile />,
            }

        ],
        errorElement: <ErrorPage />,
    },
    {
        path: '/auth',
        element: (
            <CheckAuth Element={FormPage} redirectTo='/' requireAuth={false} />
        ),
        children: [
            {
                index: true,
                element: <Fragment />,
                loader: () => redirect('login'),
            },
            {
                path: 'login',
                element: <SignIn />,
            },
            {
                path: 'register',
                element: <SignUp />,
            },
        ],
        errorElement: <ErrorPage />,
    },
]);

export default () => {
    return <RouterProvider router={router} />;
};
