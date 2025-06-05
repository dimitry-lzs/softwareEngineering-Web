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
    id: string;
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
};