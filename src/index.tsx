import { RouterProvider, redirect } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { Fragment } from 'react/jsx-runtime';
import App from './app/App';
import CheckAuth from './components/CheckAuth';
import HomeRedirect from './components/HomeRedirect';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SubscriptionGuard from './components/SubscriptionGuard';
import AppointmentHistory from './pages/AppointmentHistory';
import MyAppointments from './pages/MyAppointments';
import ErrorPage from './pages/Error';
import FormPage from './pages/FormPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Appointment from './pages/Appointment';
import AppointmentFeedback from './pages/AppointmentFeedback';
import BookAppointment from './pages/Home/bookAppointment';
import DoctorHome from './pages/DoctorPages/DoctorHome';
import SetAvailabilities from './pages/DoctorPages/SetAvailabilities';
import DoctorAppointmentHistory from './pages/DoctorPages/DoctorAppointmentHistory';
import DoctorProfile from './pages/DoctorPages/DoctorProfile';
import DoctorAppointment from './pages/DoctorPages/DoctorAppointment';
import DoctorRatings from './pages/DoctorPages/DoctorRatings';
import DoctorSubscription from './pages/DoctorPages/DoctorSubscription';
import PatientDiagnoses from './pages/PatientDiagnoses';
import TermsAndConditions from './pages/Terms';
import PrivacyPolicy from './pages/Privacy';

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
                element: <HomeRedirect />,
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
                path: '/my-appointments',
                element: <MyAppointments />,
            },
            {
                path: '/my-appointments/:id',
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
                path: '/diagnoses',
                element: <PatientDiagnoses />,
            },
            {
                path: '/doctor-home',
                element: <SubscriptionGuard><DoctorHome /></SubscriptionGuard>,
            },
            {
                path: '/doctor-home/:id',
                element: <SubscriptionGuard><DoctorAppointment /></SubscriptionGuard>,
            },
            {
                path: '/availabilities',
                element: <SubscriptionGuard><SetAvailabilities /></SubscriptionGuard>,
            },
            {
                path: '/doctor-appointments',
                element: <SubscriptionGuard><DoctorAppointmentHistory /></SubscriptionGuard>,
            },
            {
                path: '/doctor-profile',
                element: <DoctorProfile />,
            },
            {
                path: '/doctor-appointments/:id',
                element: <SubscriptionGuard><DoctorAppointment /></SubscriptionGuard>,
            },
            {
                path: '/doctor-ratings',
                element: <SubscriptionGuard><DoctorRatings /></SubscriptionGuard>,
            },
            {
                path: '/doctor-subscription',
                element: <DoctorSubscription />,
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
    {
        path: '/terms-and-conditions',
        element: <TermsAndConditions />,
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
    },
]);

export default () => {
    return <RouterProvider router={router} />;
};
