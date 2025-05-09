import { redirect, RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import App from './app/App';
import ErrorPage from './pages/Error';
import Secondary from './pages/Secondary';
// import CheckAuth from './components/CheckAuth';
import FormPage from './pages/FormPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { Fragment } from 'react/jsx-runtime';
import Main from './pages/Main';
import MyProfile from './components/Profile';
import { AppointmentHistoryTable } from './components/AppointmentHistory';

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
                loader: () => redirect('main'),
            },
            {
                path: '/main',
                element: <Main />,
            },
            {
                path: '/secondary',
                element: <Secondary />,
            },
            {
                path: '/profile',
                element: <MyProfile />,
            },
            {
                path: '/history',
                element: <AppointmentHistoryTable />,
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
