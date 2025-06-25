import { useState, useEffect } from "react";
import { APIError } from "../api";
import patient from "../api/patient";
import { notificationStore } from "../stores";
import { Rating } from "../types";

export const useUpdateRating = () => {
    const [loading, setLoading] = useState(false);

    const updateRating = async (appointmentID: string, stars: number, comments: string, callback?: () => void) => {
        setLoading(true);
        try {
            const { data } = await patient.updateRating(appointmentID, stars, comments);
            notificationStore.setNotification(
                true,
                'Rating updated successfully!',
                'success',
            );
            if (callback) callback();
            return data;
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to update rating: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    return { updateRating, loading };
}

export const useAppointmentRating = (appointmentID?: string) => {
    const [rating, setRating] = useState<Rating | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchRating = async (appointmentID: string) => {
        setLoading(true);
        try {
            const { data } = await patient.getRating(appointmentID);
            setRating(data);
        } catch (error) {
            // If rating doesn't exist, that's expected - don't show error
            setRating(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (appointmentID) {
            fetchRating(appointmentID);
        } else {
            setRating(null);
        }
    }, [appointmentID]);

    return { rating, loading, fetchRating };
}