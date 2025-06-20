import { UserType } from '../types';

/**
 * Get the appropriate home route based on user type
 * @param userType - The type of user (DOCTOR or PATIENT)
 * @returns The appropriate route path
 */
export const getUserHomeRoute = (userType: string): string => {
    return userType === UserType.Doctor ? '/doctor-home' : '/home';
};

/**
 * Get the default route for a user
 * @param userType - The type of user (DOCTOR or PATIENT)
 * @returns The appropriate default route path
 */
export const getDefaultRoute = (userType: string): string => {
    return getUserHomeRoute(userType);
};
