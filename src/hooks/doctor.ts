import { useEffect, useState } from "react";
import { Doctor, Rating } from "../types";
import { LowercaseType } from "./lowercase";
import patient from "../api/patient";
import { notificationStore } from "../stores";
import { APIError } from "../api";

export const useDoctors = () => {
    const [doctors, setDoctors] = useState<LowercaseType<Doctor>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const { data } = await patient.doctors();
            setDoctors(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to fetch doctors: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    return { doctors, loading, fetchDoctors };
}

export const useDoctor = (id?: string) => {
    const [doctor, setDoctor] = useState<LowercaseType<Doctor> | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchDoctor = async (id: string) => {
        setLoading(true);
        try {
            const { data } = await patient.doctor(id);
            setDoctor(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to fetch doctor: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchDoctor(id);
        } else {
            setDoctor(null);
        }
    }, [id]);

    return { doctor, loading, fetchDoctor };
}

export const useDoctorRatings = (doctorId?: string) => {
    const [ratings, setRatings] = useState<LowercaseType<Rating>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchRatings = async (id: string) => {
        setLoading(true);
        try {
            const { data } = await patient.doctorRatings(id);
            setRatings(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to fetch doctor ratings: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (doctorId) {
            fetchRatings(doctorId);
        } else {
            setRatings([]);
        }
    }, [doctorId]);

    return { ratings, loading, fetchRatings };
}

export const useCreateDoctorRating = () => {
    const [loading, setLoading] = useState(false);

    const createRating = async (rating: Rating) => {
        setLoading(true);
        try {
            if (!rating.doctorId) {
                throw new Error("Doctor ID is required to create a rating.");
            }
            await patient.setRating(rating.doctorId.toString(), rating.stars, rating.comments);
            notificationStore.setNotification(
                true,
                'Rating submitted successfully!',
                'success',
            );
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to set doctor rating: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    }

    return { createRating, loading };
}