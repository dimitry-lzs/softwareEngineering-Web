import { useEffect, useState } from "react";
import doctor from "../api/doctor";
import { Patient } from "../types";
import { LowercaseType } from "./lowercase";

export const usePatient = (id?: string) => {
    const [patient, setPatient] = useState<LowercaseType<Patient> | null>(null);

    const fetchPatient = async () => {
        const response = await doctor.getPatient(id);
        setPatient(response.data);
    };

    useEffect(() => {
        if (id) {
            fetchPatient();
        }
    }, [id]);

    return { patient };
};
