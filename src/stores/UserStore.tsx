import { makeAutoObservable } from 'mobx';
import { notificationStore } from '.';
import { type APIError, user } from '../api';
import { UserData } from '../types';

class UserStore {
    private loading = false;

    private userData: UserData | null = null;
    private avatar: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    getAvatar = async () => {
        this.setLoading(true);
        try {
            const response = await user.getAvatar();
            const { data } = response;
            const { avatar } = data;
            this.setAvatar(avatar);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Cannot get avatar: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            this.setLoading(false);
        }
    };

    updateAvatar = async (avatar: string): Promise<boolean> => {
        try {
            const response = await user.updateAvatar(avatar);
            const success = response.status === 200;
            if (success) {
                this.setAvatar(avatar);
            }
            return success;
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Cannot update avatar: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    };

    getLogin = async () => {
        this.setLoading(true);
        try {
            const response = await user.getLogin();
            if (response.status === 200) {
                const { data } = response;
                this.setUserData(data);
                this.getAvatar();
            }
        } catch (_) {
        } finally {
            this.setLoading(false);
        }
    };

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
                    'danger',
                );
            }
        } catch (error) {
            notificationStore.setNotification(
                true,
                'Invalid email or password',
                'danger',
            );
        } finally {
            this.setLoading(false);
        }
    };

    register = async (userData: UserData): Promise<boolean> => {
        this.setLoading(true);
        try {
            // Ensure speciality is of type Speciality or undefined
            const { speciality, ...rest } = userData;
            const registerData = {
                ...rest,
                speciality: speciality as any, // Replace 'any' with 'Speciality' if you can import the type
            };
            const response = await user.register(registerData);
            return response.status === 201;
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Cannot register user: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    };

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
                    'danger',
                );
            }
        } catch (error) {
            notificationStore.setNotification(true, 'Logout failed', 'danger');
        } finally {
            this.setLoading(false);
        }
    };

    updateUserData = async (userData: UserData): Promise<boolean> => {
        this.setLoading(true);
        try {
            const response = await user.updateUserData(userData);
            if (response.status === 200) {
                this.getLogin();
                notificationStore.setNotification(
                    true,
                    'User data updated successfully',
                    'success',
                );
                return true;
            }
            notificationStore.setNotification(true, 'Update failed', 'danger');
            return false;
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Cannot update user data: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    };

    setAvatar = (avatar: string | null) => {
        this.avatar = avatar;
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
    get phone() {
        return this.userData?.phone || '';
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
    get avatarData() {
        return this.avatar || '';
    }
    get bio() {
        return this.userData?.bio || '';
    }
}

export default UserStore;
