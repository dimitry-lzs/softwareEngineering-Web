import { redirect, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import App from './app/App';
import ErrorPage from './pages/Error';
// import CheckAuth from './components/CheckAuth';
import FormPage from './pages/FormPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Fragment } from 'react/jsx-runtime';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AppointmentHistory from './pages/AppointmentHistory';
import Calendar from './pages/Calendar';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

const router = createBrowserRouter([
    {
        path: '/',
        // element: <CheckAuth Element={App} redirectTo='/auth' requireAuth={true} />,
        element: <App />,
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
                path: '/calendar',
                element: <Calendar />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/history',
                element: <AppointmentHistory />,
            }
        ],
        errorElement: <ErrorPage />,
    },
    {
        path: '/auth',
        element: <FormPage />,
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
            }
        ],
        errorElement: <ErrorPage />,
    }
]);

export default () => {
    return <RouterProvider router={router} />;
};
