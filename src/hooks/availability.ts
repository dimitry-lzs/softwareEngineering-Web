import { useEffect, useState } from "react";
import { Availability } from "../types";
import { LowercaseType } from "./lowercase";
import patient from "../api/patient";

export const useDoctorAvailability = (id?: string) => {
    const [availabilities, setAvailabilities] = useState<LowercaseType<Availability>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAvailability = async (id: string) => {
        setLoading(true);
        try {
            const { data } = await patient.doctorAvailability(id);
            setAvailabilities(data);
        } catch (error) {
            console.error("Failed to fetch availability:", error);
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