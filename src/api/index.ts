import axios, { type AxiosError } from 'axios';
import type { OfficeLocation, Speciality, UserData } from '../types';

export type APIError = AxiosError & { response: { data: { error: string } } };

export const client = axios.create({
    baseURL: '/api',
});

// Response interceptor to handle 401 unauthorized errors
client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Dynamically import stores to avoid circular dependencies
            import('../stores').then(({ userStore, notificationStore }) => {
                notificationStore.setNotification(
                    true,
                    'Session expired. You have been logged out.',
                    'danger'
                );
                userStore.logout();
            });
            return;
        }
        return Promise.reject(error);
    }
);


const user = {
    register: async (userData: {
        fullName: string;
        email: string;
        password: string;
        userType: string;
        speciality?: Speciality;
        licenceID?: string;
        officeLocation?: OfficeLocation;
        amka?: string;
    }) => client.post('/register', userData),
    login: async (userData: {
        email: string;
        password: string;
    }) => client.post('/login', userData),
    getLogin: async () => client.get('/login'),
    logout: async () => client.get('/logout'),
    getAvatar: async () => client.get('/avatar'),
    updateAvatar: async (avatar: string) =>
        client.post('/update-avatar', { avatar }),
    updateUserData: async (userData: UserData) =>
        client.post('/update-user', userData),
};

export { user };
