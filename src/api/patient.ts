import { client } from '.';
import { Speciality } from '../types';

export default {
    doctors: async () => client.get('/doctors'),
    doctor: async (id: string) => client.get(`/doctors/${id}`),
    specialities: async () => client.get<Speciality[]>('/specialities'),
    doctorRatings: async (doctorID: string) => client.get('/doctor-ratings', {
        params: { doctorID }
    }),
    appointments: async (status?: string) => client.get('/patient-appointments', {
        params: { status }
    }),
}