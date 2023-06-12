import api from './api';


export interface LoginValues {
    email: string;
    password: string;
}

export const login = async (loginValues: LoginValues): Promise<LoginValues> => {
    const response = await api.post<LoginValues>('/auth//login', loginValues);
    return response.data;
}