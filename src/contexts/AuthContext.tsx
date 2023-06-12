import React, { createContext, useContext, useEffect, useState } from "react";

import { LoginValues } from '../services/authService';

interface AuthContextProps {
    authenticated: boolean;
    user: LoginValues;
    login: (user: LoginValues) => void;
    logout: () => void;
    inLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setLoginValues] = useState({} as LoginValues);
    const [inLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedLoginValues = localStorage.getItem("user");
        if (storedLoginValues) {
            setLoginValues(JSON.parse(storedLoginValues));
            setAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (loggedInLoginValues: LoginValues) => {
        setLoginValues(loggedInLoginValues);
        setAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(loggedInLoginValues));
    };

    const logout = () => {
        setLoginValues({} as LoginValues);
        setAuthenticated(false);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ authenticated, user, login, logout, inLoading }}>
            {children}
        </AuthContext.Provider>
    );
}