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

export type Appointment = {
    appointmentid: number;
    status: AppointmentStatus;
    reason: string;
    doctor_id: number;
    doctor_avatar: string;
    doctor_name: string;
    doctor_specialty: Speciality;
    doctor_email: string;
    doctor_phone: string;
    doctor_officeLocation: OfficeLocation;
    doctor_bio: string;
    slot_id: number;
    slot_timeFrom: string;
    diagnosis_decease?: string;
    diagnosis_details?: string;
};

export type Availability = {
    availabilityId: number;
    timeFrom: Date;
    doctorId: number;
};