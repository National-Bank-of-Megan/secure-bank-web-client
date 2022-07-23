import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "../constants/Constants";

export const isValidPassword = (password: string) => {
    return (/\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password)
        && password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH);
}
