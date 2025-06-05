import { client } from '.';

export default {
    doctors: async () => client.get('/doctors'),
    doctor: async (id: string) => client.get(`/doctors/${id}`),
}