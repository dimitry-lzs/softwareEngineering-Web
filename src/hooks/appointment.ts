import { useEffect, useState } from "react";
import { LowercaseType } from "./lowercase";
import { Appointment } from "../types";
import patient from "../api/patient";

export const useAppointments = (status?: string) => {
    const [appointments, setAppointments] = useState<LowercaseType<Appointment>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = async (status?: string) => {
        setLoading(true);
        try {
            const { data } = await patient.appointments(status);
            setAppointments(data);
        } catch (error) {
            console.error("Failed to fetch appointments:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments(status);
        console.log("Appointments fetched:", appointments);
    }, []);

    return { appointments, loading, fetchAppointments };
}

export const useAppointment = (id?: string) => {
    const [appointment, setAppointment] = useState<LowercaseType<Appointment> | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchAppointment = async (id: string) => {
        setLoading(true);
        try {
            const { data } = await patient.appointment(id);
            setAppointment(data);
        } catch (error) {
            console.error("Failed to fetch appointment:", error);
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

export const useCancelAppointment = (id: string) => {
    const [loading, setLoading] = useState(false);

    const cancelAppointment = async (id: string) => {
        setLoading(true);
        try {
            await patient.cancelAppointment(id);
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        if (id) {
            cancelAppointment(id);
        }
    }, [id]);
    
    return { cancelAppointment, loading };
}