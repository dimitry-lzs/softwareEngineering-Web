import { client } from '.';

export default {
    setDoctorAvailability: async (availabilities: { slots: string[] }) => client.post('/set-availability', availabilities),
    getAvailabilities: async () => client.get('/doctor-availabilities'),
    appointments: async () => client.get('/doctor-appointments'),
    appointment: async (id: string) => client.get(`/view-appointment-details`, {
        params: { appointmentID: id }
    }),
    saveDiagnosis: async (appointmentId: string, diagnosis: string, diagnosisDetails: string) =>
        client.post('/save-diagnosis', {
            appointmentID: appointmentId,
            diagnosis,
            diagnosisDetails
        }),
    getPatient: async (id?: string) => client.get(`/patients/${id}`),
}