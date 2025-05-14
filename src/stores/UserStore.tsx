import { makeAutoObservable } from 'mobx';
import { APIError, user } from '../api';
import { notificationStore } from '.';

export type UserData = {
    fullName: string;
    email: string;
    password: string;
    userType: string;
    speciality?: string;
    licenceID?: string;
    officeLocation?: string;
    amka?: string;
};

class UserStore {
    private loading = false;

    private userData: UserData | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    getLogin = async () => {
        this.setLoading(true);
        try {
            const response = await user.getLogin();
            if (response.status === 200) {
                const { data } = response;
                this.setUserData(data);
            }
        } catch (_) {
        } finally {
            this.setLoading(false);
        }
    }

    login = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        this.setLoading(true);
        try {
            const response = await user.login({ email, password });

            if (response.status === 200) {
                const { data } = response;
                this.setUserData(data);
            } else {
                notificationStore.setNotification(
                    true,
                    'Invalid email or password',
                    'danger'
                );
            }
        } catch (error) {
            notificationStore.setNotification(
                true,
                'Invalid email or password',
                'danger'
            );
        } finally {
            this.setLoading(false);
        }
    };

    register = async (userData: UserData): Promise<boolean> => {
        this.setLoading(true);
        try {
            const response = await user.register(userData);
            return response.status === 201
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Cannot register user: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger'
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    }

    logout = async () => {
        this.setLoading(true);
        try {
            const response = await user.logout();
            if (response.status === 200) {
                this.setUserData(null);
            } else {
                notificationStore.setNotification(
                    true,
                    'Logout failed',
                    'danger'
                );
            }
        } catch (error) {
            notificationStore.setNotification(
                true,
                'Logout failed',
                'danger'
            );
        } finally {
            this.setLoading(false);
        }
    };

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setUserData = (userData: UserData | null) => {
        this.userData = userData;
    };

    get isLoading() {
        return this.loading;
    }
    get isLoggedIn() {
        return this.userData !== null;
    }
    get userType() {
        return this.userData?.userType || '';
    }
    get fullName() {
        return this.userData?.fullName || '';
    }
    get email() {
        return this.userData?.email || '';
    }
    get speciality() {
        return this.userData?.speciality || '';
    }
    get licenceID() {
        return this.userData?.licenceID || '';
    }
    get officeLocation() {
        return this.userData?.officeLocation || '';
    }
    get amka() {
        return this.userData?.amka || '';
    }
}

export default UserStore;
