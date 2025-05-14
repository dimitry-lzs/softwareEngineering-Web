import axios, { AxiosError } from 'axios';

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
}

export {
    user
}