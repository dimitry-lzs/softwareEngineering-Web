import { makeAutoObservable } from 'mobx';
import { Speciality } from '../types';
import patient from '../api/patient';
import { notificationStore } from '.';
import { APIError } from '../api';

class DataStore {
    private loading = false;
    private specialities: Speciality[] = [];

    constructor() {
        makeAutoObservable(this);
        this.retreiveSpecialities();
    }

    setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    get isLoading() {
        return this.loading;
    }

    setSpecialities = (specialities: Speciality[]) => {
        this.specialities = specialities;
    };

    get specialitiesList() {
        return this.specialities;
    }

    retreiveSpecialities = async () => {
        this.setLoading(true);
        try {
            const response = await patient.specialities();
            if (response.status === 200) {
                this.setSpecialities(response.data);
            }
        } catch (error) {
            const apiError = error as APIError;
            notificationStore.setNotification(
                true,
                `Failed to fetch specialities: ${apiError.response?.data?.error || 'Unknown error'}`,
                'danger',
            );
        } finally {
            this.setLoading(false);
        }
    };
}

export default DataStore;
