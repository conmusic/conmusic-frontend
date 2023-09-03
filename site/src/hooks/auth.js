import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [data, setData] = useState({
        token: null,
        name: null,
        email: null,
        id: 0
    });

    useEffect(() => {
        let token = localStorage.getItem('@conmusic:token');
        let name = localStorage.getItem('@conmusic:name');
        let email = localStorage.getItem('@conmusic:email');
        let id = localStorage.getItem('@conmusic:id');

        if (token && name) {
            api.defaults.headers.authorization = `Bearer ${token}`;

            setData({ token, name, email, id: Number(id) })
        }
    }, [setData])

    const login = useCallback(async ({ email, password }) => {
        const body = {
            email,
            password
        }

        const response = await api.post('/users/authentication', body)

        const { token, name, id } = response.data;

        localStorage.setItem('@conmusic:token', token);
        localStorage.setItem('@conmusic:name', name);
        localStorage.setItem('@conmusic:email', email);
        localStorage.setItem('@conmusic:id', id);

        setData({ token, name, email, id: Number(id) })
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('@conmusic:token');
        localStorage.removeItem('@conmusic:name');
        localStorage.removeItem('@conmusic:email');
        localStorage.removeItem('@conmusic:id');

        setData({ token: null, name: null, email: null, id: 0 })
    }, []);

    const updateUser = useCallback(({ name, email }) => {
        localStorage.setItem('@conmusic:name', name);
        localStorage.setItem('@conmusic:email', email);

        setData({ name, email })
    }, [])

    return (
        <AuthContext.Provider
            value={{ userId: data.id, userName: data.name, login, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context;
}

export { useAuth, AuthProvider };