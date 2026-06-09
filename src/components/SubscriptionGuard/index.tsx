import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingPage from '../../pages/LoadingPage';
import { subscriptionStore, userStore } from '../../stores';
import { UserType } from '../../types';

/**
 * Guard component that checks if a doctor has an active subscription.
 * If not subscribed, redirects to the subscription page.
 * Patients and non-doctor users pass through without checks.
 */
function SubscriptionGuard({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (userStore.userType === UserType.Doctor && !subscriptionStore.isStatusChecked) {
            subscriptionStore.fetchSubscription();
        }
    }, []);

    // Only gate doctors
    if (userStore.userType !== UserType.Doctor) {
        return <>{children}</>;
    }

    // Wait for subscription status to be checked
    if (!subscriptionStore.isStatusChecked) {
        return <LoadingPage />;
    }

    // If not subscribed, redirect to subscription page
    if (!subscriptionStore.isSubscribed) {
        return <Navigate to="/doctor-subscription" replace />;
    }

    return <>{children}</>;
}

export default observer(SubscriptionGuard);
