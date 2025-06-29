export enum UserType {
    Doctor = 'DOCTOR',
    Patient = 'PATIENT',
}

export enum OfficeLocation {
    Athens = 'ATHENS',
    Thessaloniki = 'THESSALONIKI',
    Patras = 'PATRAS',
}

export enum Speciality {
    Cardiologist = 'CARDIOLOGIST',
    Dermatologist = 'DERMATOLOGIST',
    Dentist = 'DENTIST',
    Endocrinologist = 'ENDOCRINOLOGIST',
    Gastroenterologist = 'GASTROENTEROLOGIST',
    Gynecologist = 'GYNECOLOGY',
    Neurologist = 'NEUROLOGIST',
    Oncologist = 'ONCOLOGIST',
    Orthopedist = 'ORTHOPEDIST',
    Otorhinolaryngologist = 'OTORHINOLARYNGOLOGIST',
    Pediatrician = 'PEDIATRICIAN',
    Psychiatrist = 'PSYCHIATRIST',
    Radiologist = 'RADIOLOGIST',
    Urologist = 'UROLOGIST',
    Ornithologist = 'ORNITHOLOGIST',
    Ophthalmologist = 'OPHTHALMOLOGIST',
}

export enum AppointmentStatus {
    Pending = 'PENDING',
    Cancelled = 'CANCELLED',
    Completed = 'COMPLETED',
}

export type UserData = {
    fullName: string;
    email: string;
    password: string;
    userType: UserType;
    phone?: string;
    speciality?: string;
    licenceID?: string;
    officeLocation?: OfficeLocation;
    amka?: string;
    bio?: string;
};


export type User = {
    id: number;
    fullName: string;
    avatar: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
};

export type Patient = User & {
    amka: string;
};

export type Doctor = User & {
    speciality: Speciality;
    officeLocation: OfficeLocation;
    licenseID: string;
    bio: string;
    rating: number;
};

export type Rating = {
    appointmentID: number;
    stars: number;
    comments: string;
    doctorId?: number;
    patientId?: number;
}

export type NewAppointment = {
    doctorID: string;
    status: AppointmentStatus;
    slotID: number;
    reason: string;
}

export type Diagnosis = {
    appointmentID: number;
    decease: string;
    details: string;
}

export type Appointment = {
    appointmentID: number;
    patientID: number;
    patient_avatar: string;
    doctorID: number;
    slotID: number;
    status: string;
    reason: string;
    // Doctor information (populated by backend when needed)
    doctor_id: number;
    doctor_avatar?: string;
    doctor_name: string;
    doctor_specialty: string;
    doctor_email: string;
    doctor_phone?: string;
    doctor_officeLocation: string;
    doctor_bio: string;
    doctor_licenceID: string;
    // Slot information
    slot_id: number;
    slot_timefrom: string;
    // Multiple diagnoses (NEW STRUCTURE)
    diagnoses?: Diagnosis[];
    // Legacy fields (for backward compatibility)
    appointmentid?: number;
    doctorid?: number;
    patientid?: number;
    slotid?: number;
    diagnosis_decease?: string;
    diagnosis_details?: string;
};

// Type for upcoming appointments which have a simplified structure
export type UpcomingAppointment = {
    appointmentid: number;
    doctorid: number;
    patientid: number;
    slotid: number;
    status: string;
    reason: string;
    slot_timefrom: string;
    patient_name: string;
    patient_avatar: string;
    patient_phone: string;
    // Doctor info might also be included in upcoming appointments
    doctor_name?: string;
    doctor_specialty?: string;
    doctor_avatar?: string;
};

// Union type for appointments that can be either detailed or upcoming
export type AppointmentWithPatientInfo = Appointment | UpcomingAppointment;

export type Availability = {
    availabilityid: number;
    doctorid: number;
    free: number; // 1 for free, 0 for taken
    timefrom: string; // ISO string format
};