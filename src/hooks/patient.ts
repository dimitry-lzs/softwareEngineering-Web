import { useEffect, useState } from "react";
import doctor from "../api/doctor";
import patient from "../api/patient";
import { Patient, Diagnosis } from "../types";
import { LowercaseType } from "./lowercase";
import { notificationStore } from "../stores";
import { APIError } from "../api";

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

export const usePatientDiagnoses = () => {
    const [diagnoses, setDiagnoses] = useState<LowercaseType<Diagnosis>[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDiagnoses = async () => {
        setLoading(true);
        try {
            const { data } = await patient.getDiagnoses();
            setDiagnoses(data);
        } catch (error) {
            const axiosError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to fetch diagnoses: ${axiosError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiagnoses();
    }, []);

    return { diagnoses, loading, fetchDiagnoses };
};
