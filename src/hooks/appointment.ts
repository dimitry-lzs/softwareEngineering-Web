import { useEffect, useState } from "react";
import { Appointment, NewAppointment } from "../types";
import patient from "../api/patient";
import { notificationStore } from "../stores";
import { APIError } from "../api";

export const useAppointments = (status?: string) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async (status?: string) => {
        setLoading(true);
        try {
            const { data } = await patient.appointments(status);
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
        fetchAppointments(status);
    }, []);

    return { appointments, loading, fetchAppointments };
}

export const useAppointment = (id?: string) => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchAppointment = async (id: string) => {
        setLoading(true);
        try {
            const { data } = await patient.appointment(id);
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
    }, [id]);

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