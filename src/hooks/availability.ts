import { useEffect, useState } from "react";
import { Availability } from "../types";
import { LowercaseType } from "./lowercase";
import patient from "../api/patient";
import doctor from "../api/doctor";
import { notificationStore } from "../stores";
import { APIError } from "../api";

export const useAvailabilities = () => {
    const [availabilities, setAvailabilities] = useState<LowercaseType<Availability>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAvailabilities = async () => {
        setLoading(true);
        try {
            const { data } = await doctor.getAvailabilities();
            setAvailabilities(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Cannot fetch availabilities: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    const refreshAvailabilities = () => fetchAvailabilities();

    return { availabilities, loading, refreshAvailabilities };
}

export const useDoctorAvailability = (id?: string) => {
    const [availabilities, setAvailabilities] = useState<LowercaseType<Availability>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAvailability = async (id: string) => {
        setLoading(true);
        try {
            const { data } = await patient.doctorAvailability(id);
            setAvailabilities(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Cannot fetch doctor availability: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchAvailability(id);
        } else {
            setAvailabilities([]);
        }
    }, [id]);

    return { availabilities, loading, fetchAvailability };
}

export const useSetAvailability = () => {
    const [loading, setLoading] = useState(false);

    const setAvailability = async (availabilities: { slots: string[] }, callback?: () => void) => {
        setLoading(true);
        try {
            await doctor.setDoctorAvailability(availabilities);
            if (callback) callback();
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to set availability: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    return { loading, setAvailability };
}