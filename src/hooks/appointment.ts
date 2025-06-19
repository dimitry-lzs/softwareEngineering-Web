import { useEffect, useState } from "react";
import { Appointment, NewAppointment } from "../types";
import patient from "../api/patient";
import { notificationStore } from "../stores";
import { APIError } from "../api";
import doctor from "../api/doctor";

export const useAppointments = (isPatient?: boolean) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const method = isPatient ? patient.appointments : doctor.appointments;
            const { data } = await method();
            setAppointments(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to fetch appointments: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, [isPatient]);

    return { appointments, loading, fetchAppointments };
}

export const useAppointment = (id?: string, isDoctor?: boolean) => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchAppointment = async (id: string) => {
        setLoading(true);
        try {
            const method = isDoctor ? doctor.appointment : patient.appointment;
            const { data } = await method(id);
            setAppointment(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to fetch appointment: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchAppointment(id);
        } else {
            setAppointment(null);
        }
    }, [id, isDoctor]);

    return { appointment, loading, fetchAppointment };
}

export const useCreateAppointment = () => {
    const [loading, setLoading] = useState(false);

    const createAppointment = async (appointment: NewAppointment) => {
        setLoading(true);
        try {
            await patient.setAppointment(appointment);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to create appointment: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    return { createAppointment, loading };
}

export const useCancelAppointment = () => {
    const [loading, setLoading] = useState(false);

    const cancelAppointment = async (id: string) => {
        setLoading(true);
        try {
            await patient.cancelAppointment(id);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to cancel appointment: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    return { cancelAppointment, loading };
}

export const useSaveDiagnosis = () => {
    const [loading, setLoading] = useState(false);

    const saveDiagnosis = async (appointmentId: string, diagnosis: string, diagnosisDetails: string) => {
        setLoading(true);
        try {
            await doctor.saveDiagnosis(appointmentId, diagnosis, diagnosisDetails);
            notificationStore.setNotification(
                true,
                'Diagnosis saved successfully',
                'success',
            );
            return true;
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to save diagnosis: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { saveDiagnosis, loading };
}