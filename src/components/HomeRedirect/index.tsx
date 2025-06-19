import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userStore } from '../../stores';
import { getDefaultRoute } from '../../misc/userRedirect';

/**
 * Component that redirects users to the appropriate home page based on their user type
 */
function HomeRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        // Get the appropriate route based on user type
        const defaultRoute = getDefaultRoute(userStore.userType);
        navigate(defaultRoute, { replace: true });
    }, [navigate]);

    // This component doesn't render anything, it just redirects
    return null;
}

export default observer(HomeRedirect);
