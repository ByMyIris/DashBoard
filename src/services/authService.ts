import { User, getUserByEmail } from "./userService";

export interface LoginValues {
    email: string;
    password: string;
}

export const login = async (loginValues: LoginValues): Promise<User> => {
    const user = await getUserByEmail(loginValues.email);
    
    if (user && user.password === loginValues.password) {
        return user;
    } else {
        throw new Error("Email e/ou password inválido(s)");
    }
}