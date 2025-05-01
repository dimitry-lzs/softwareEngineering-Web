// import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { userStore } from '../../stores';

function CheckAuth({
    Element,
    requireAuth,
    redirectTo,
}: {
    Element: React.ElementType;
    redirectTo: string;
    requireAuth: boolean;
}) {
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     userStore.getLogin().then(() => setTimeout(() => setIsLoading(false), 1e3));
    // }, []);

    // if (isLoading) {
    //     return <LoadingPage />;
    // }

    return userStore.isLoggedIn === requireAuth ? (
        <Element />
    ) : (
        <Navigate to={redirectTo} replace />
    );
}

export default observer(CheckAuth);
