import { client } from '.';

export default {
    setDoctorAvailability: async (availabilities: { slots: string[] }) => client.post('/set-availability', availabilities),
    getAvailabilities: async () => client.get('/doctor-availabilities'),
    deleteAvailability: async (availabilityId: number) => client.delete(`/delete-availability/${availabilityId}`),
    appointments: async () => client.get('/doctor-appointments'),
    appointment: async (id: string) => client.get(`/view-appointment-details`, {
        params: { appointmentID: id }
    }),
    setDiagnosis: async (appointmentID: string, decease: string, details: string) =>
        client.post('/diagnosis', {
            appointmentID,
            decease,
            details
        }),
    completeAppointment: async (id: string) => client.patch('/complete-appointment', {
        appointmentID: id
    }),
    getPatient: async (id?: string) => client.get(`/patients/${id}`),
    getRatings: async () => client.get('/ratings'),
}