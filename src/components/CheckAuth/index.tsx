import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingPage from '../../pages/LoadingPage';
import { userStore } from '../../stores';
import { getDefaultRoute } from '../../misc/userRedirect';

function CheckAuth({
    Element,
    requireAuth,
    redirectTo,
}: {
    Element: React.ElementType;
    redirectTo: string;
    requireAuth: boolean;
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        userStore.getLogin().then(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    // If user is not logged in but auth is required, redirect to auth
    if (!userStore.isLoggedIn && requireAuth) {
        return <Navigate to={redirectTo} replace />;
    }

    // If user is logged in but auth is not required (e.g., trying to access auth page)
    if (userStore.isLoggedIn && !requireAuth) {
        // Redirect based on user type
        const userTypeRedirect = getDefaultRoute(userStore.userType);
        return <Navigate to={userTypeRedirect} replace />;
    }

    // User auth state matches requirements
    return <Element />;
}

export default observer(CheckAuth);
