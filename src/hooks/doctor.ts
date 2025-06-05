import { useEffect, useState } from "react";
import { Doctor, Rating } from "../types";
import { LowercaseType } from "./lowercase";
import patient from "../api/patient";

export const useDoctors = () => {
    const [doctors, setDoctors] = useState<LowercaseType<Doctor>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const { data } = await patient.doctors();
            setDoctors(data);
        } catch (error) {
            console.error("Failed to fetch doctors:", error);
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
            console.error("Failed to fetch doctor:", error);
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
            console.error("Failed to fetch doctor ratings:", error);
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

export const useCreateDoctorRating = async () => {
    const [loading, setLoading] = useState(false);

    const createRating = async (rating: Rating) => {
        setLoading(true);
        try {
            await patient.setRating(rating.doctorId.toString(), rating.stars, rating.comments);
        } catch (error) {
            console.error("Failed to set doctor rating:", error);
        } finally {
            setLoading(false);
        }
    }

    return { createRating, loading };
}