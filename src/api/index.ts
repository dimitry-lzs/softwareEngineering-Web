import axios, { AxiosError } from 'axios';
import { UserData } from '../stores/UserStore';

export type APIError = AxiosError & { response: { data: { error: string } } }

const client = axios.create({
    baseURL: '/api',
});

const user = {
    register: async (userData: {
        fullName: string;
        email: string;
        password: string;
        userType: string;
        speciality?: string;
        licenceID?: string;
        officeLocation?: string;
        amka?: string;
    }) => client.post('/register', userData),
    login: async (userData: {
        email: string;
        password: string;
    }) => client.post('/login', userData),
    getLogin: async () => client.get('/login'),
    logout: async () => client.get('/logout'),
    getAvatar: async () => client.get('/avatar'),
    updateAvatar: async (avatar: string) => client.post('/update-avatar', { avatar }),
    updateUserData: async (userData: UserData) => client.post('/update-user', userData),
}

export {
    user
}