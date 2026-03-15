/* ===== IMPORTS ===== */
import React, { createContext, useState, useContext, useEffect } from 'react';

/* ===== CREATE CONTEXT ===== */
const AuthContext = createContext(null);

/* ===== DEFAULT ADMIN PASSWORD ===== */
const DEFAULT_PASSWORD = 'SME';

/* ===== PROVIDER COMPONENT ===== */
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('smeflow_admin_auth') === 'true';
    });

    /* Persist auth state */
    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem('smeflow_admin_auth', 'true');
        } else {
            localStorage.removeItem('smeflow_admin_auth');
        }
    }, [isAuthenticated]);

    /** Get the current password (custom or default). */
    const getPassword = () => {
        return localStorage.getItem('smeflow_admin_password') || DEFAULT_PASSWORD;
    };

    /** Verify password and log in. */
    const login = (password) => {
        if (password === getPassword()) {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    /** Log out and clear session. */
    const logout = () => {
        setIsAuthenticated(false);
    };

    /** Change admin password (requires current password verification). */
    const changePassword = (currentPassword, newPassword) => {
        if (currentPassword !== getPassword()) {
            return { success: false, message: 'Current password is incorrect.' };
        }
        if (newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters.' };
        }
        localStorage.setItem('smeflow_admin_password', newPassword);
        return { success: true, message: 'Password changed successfully!' };
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

/* ===== CUSTOM HOOK ===== */
export const useAuth = () => {
    return useContext(AuthContext);
};
