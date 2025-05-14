import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { userStore } from '../../stores';
import LoadingPage from '../../pages/LoadingPage';

function CheckAuth({
    Element,
    requireAuth,
    redirectTo,
}: {
    Element: React.ElementType;
    redirectTo: string;
    requireAuth: boolean;
}) {
    useEffect(() => {
        userStore.getLogin();
    }, []);

    if (userStore.isLoading) {
        return <LoadingPage />;
    }

    return userStore.isLoggedIn === requireAuth ? (
        <Element />
    ) : (
        <Navigate to={redirectTo} replace />
    );
}

export default observer(CheckAuth);
