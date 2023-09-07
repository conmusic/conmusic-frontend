import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

import api from "../services/api";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [data, setData] = useState({
        token: null,
        type: null,
        user: null,
        id: 0
    });

    useEffect(() => {
        const token = localStorage.getItem('@conmusic:token');
        const user = localStorage.getItem('@conmusic:user');
        const type = localStorage.getItem('@conmusic:type');
        const id = localStorage.getItem('@conmusic:id');

        if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;

            setData({ token, user: JSON.parse(user), type, id: Number(id) })
        }
    }, [setData])

    const login = useCallback(async ({ email, password }) => {
        const body = {
            email,
            password
        }

        const response = await api.post('/users/authentication', body)

        const { token, user } = response.data;

        localStorage.setItem('@conmusic:token', token);
        localStorage.setItem('@conmusic:user', JSON.stringify(user));
        localStorage.setItem('@conmusic:type', user.userType);
        localStorage.setItem('@conmusic:id', user.id);

        setData({ token, user, type: user.userType, id: Number(user.id) })
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('@conmusic:token');
        localStorage.removeItem('@conmusic:user');
        localStorage.removeItem('@conmusic:type');
        localStorage.removeItem('@conmusic:id');

        setData({ token: null, user: null, type: null, id: 0 })
    }, []);

    const updateUser = useCallback((user) => {
        localStorage.setItem('@conmusic:user', JSON.stringify(user));

        setData({ user })
    }, [])

    return (
        <AuthContext.Provider
            value={{ userId: data.id, type: data.type, user: data.user, login, logout, updateUser }}
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