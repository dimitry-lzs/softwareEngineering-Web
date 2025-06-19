import { client } from '.';

export default {
    setDoctorAvailability: async (availabilities: { slots: string[] }) => client.post('/set-availability', availabilities),
    getAvailabilities: async () => client.get('/doctor-availabilities'),
}