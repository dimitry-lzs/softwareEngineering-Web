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
    setDiagnosis: async (appointmentID: string, decease: string, details: string) =>
        client.post('/set-diagnosis', {
            appointmentID,
            decease,
            details
        }),
    completeAppointment: async (id: string) => client.patch('/complete-appointment', {
        appointmentID: id
    }),
    getPatient: async (id?: string) => client.get(`/patients/${id}`),
}