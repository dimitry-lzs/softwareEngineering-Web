import { client } from '.';
import { NewAppointment, Speciality } from '../types';

export default {
    doctors: async (isDark?: boolean) => {
        const params: any = {};
        if (isDark !== undefined) {
            params.is_dark = isDark.toString();
        }
        return client.get('/doctors', { params });
    },
    doctor: async (id: string) => client.get(`/doctors/${id}`),
    specialities: async () => client.get<Speciality[]>('/specialities'),
    doctorRatings: async (doctorID: string) => client.get('/ratings', {
        params: { doctorID }
    }),
    appointments: async () => client.get('/patient-appointments'),
    appointment: async (id: string) => client.get(`/view-appointment-details`, {
        params: { appointmentID: id }
    }),
    setAppointment: async (appointment: NewAppointment) => client.post('/set-appointment', {
        ...appointment
    }),
    cancelAppointment: async (id: string) => client.patch(`/cancel-appointment`, {
        appointmentID: id
    }),
    setRating: async (appointmentID: number, stars: number, comments: string) => client.post('/set-rating', {
        appointmentID,
        stars,
        comments
    }),
    getRating: async (appointmentID: string) => client.get(`/ratings/${appointmentID}`),
    updateRating: async (appointmentID: string, stars: number, comments: string) => client.put(`/ratings/${appointmentID}`, {
        stars,
        comments
    }),
    doctorAvailability: async (doctorID: string) => client.get('/get-doctor-availabilities', {
        params: { doctorID }
    }),
    getDiagnoses: async () => client.get('/diagnoses'),
}