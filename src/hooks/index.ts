import { useEffect, useState } from "react";
import { Doctor } from "../types";
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
