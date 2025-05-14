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
            } else {
                notificationStore.setNotification(
                    true,
                    'Unathorized',
                    'danger'
                );
            }
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Access Denied: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger'
            );
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

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    setUserData = (userData: UserData) => {
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
}

export default UserStore;
