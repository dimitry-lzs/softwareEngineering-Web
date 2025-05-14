export interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    fullName: HTMLInputElement;
    speciality: HTMLInputElement;
    licenceID: HTMLInputElement;
    officeLocation: HTMLInputElement;
    amka: HTMLInputElement;
}
export interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}
