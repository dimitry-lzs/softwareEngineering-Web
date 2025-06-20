import { useState } from "react";
import { notificationStore } from "../stores";
import { APIError } from "../api";
import doctor from "../api/doctor";

export const useAddDiagnosis = () => {
    const [loading, setLoading] = useState(false);

    const addDiagnosis = async (appointmentID: string, decease: string, details: string) => {
        setLoading(true);
        try {
            await doctor.setDiagnosis(appointmentID, decease, details);
            notificationStore.setNotification(
                true,
                'Diagnosis added successfully!',
                'success',
            );
            return true;
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to add diagnosis: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { addDiagnosis, loading };
}