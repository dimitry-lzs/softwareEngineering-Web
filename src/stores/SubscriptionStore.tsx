import { makeAutoObservable } from 'mobx';
import { Subscription, SubscriptionPlan } from '../types';
import subscriptionApi from '../api/subscription';
import { notificationStore } from '.';
import { APIError } from '../api';

class SubscriptionStore {
    private loading = false;
    private subscription: Subscription | null = null;
    private statusChecked = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoading() {
        return this.loading;
    }

    get isSubscribed() {
        return this.subscription !== null;
    }

    get isStatusChecked() {
        return this.statusChecked;
    }

    get currentSubscription() {
        return this.subscription;
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setSubscription = (subscription: Subscription | null) => {
        this.subscription = subscription;
    };

    setStatusChecked = (checked: boolean) => {
        this.statusChecked = checked;
    };

    /**
     * Fetch the current doctor's active subscription.
     */
    fetchSubscription = async () => {
        this.setLoading(true);
        try {
            const response = await subscriptionApi.getSubscription();
            if (response.status === 200) {
                this.setSubscription(response.data);
            }
        } catch (error: any) {
            // 404 means no active subscription — that's expected
            if (error?.response?.status === 404) {
                this.setSubscription(null);
            } else {
                const apiError = error as APIError;
                notificationStore.setNotification(
                    true,
                    `Failed to fetch subscription: ${apiError.response?.data?.error || 'Unknown error'}`,
                    'danger',
                );
            }
        } finally {
            this.setLoading(false);
            this.setStatusChecked(true);
        }
    };

    /**
     * Create a new mock subscription.
     */
    subscribe = async (plan: SubscriptionPlan): Promise<boolean> => {
        this.setLoading(true);
        try {
            const response = await subscriptionApi.subscribe(plan);
            if (response.status === 201) {
                this.setSubscription(response.data);
                notificationStore.setNotification(
                    true,
                    `Successfully subscribed to the ${plan === SubscriptionPlan.Monthly ? 'Monthly' : 'Yearly'} plan!`,
                    'success',
                );
                return true;
            }
            return false;
        } catch (error) {
            const apiError = error as APIError;
            notificationStore.setNotification(
                true,
                `Subscription failed: ${apiError.response?.data?.error || apiError.response?.data?.message || 'Unknown error'}`,
                'danger',
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Cancel auto-renewal for the active subscription.
     */
    cancelRenewal = async (): Promise<boolean> => {
        this.setLoading(true);
        try {
            const response = await subscriptionApi.cancelRenewal();
            if (response.status === 200) {
                this.setSubscription(response.data);
                notificationStore.setNotification(
                    true,
                    'Auto-renewal has been cancelled. Your subscription remains active until the end date.',
                    'success',
                );
                return true;
            }
            return false;
        } catch (error) {
            const apiError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to cancel renewal: ${apiError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Reset subscription state (e.g., on logout).
     */
    reset = () => {
        this.setSubscription(null);
        this.setStatusChecked(false);
    };
}

export default SubscriptionStore;
