/* ===== IMPORTS ===== */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ===== CONTEXT ===== */
const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

/* ===== PROVIDER ===== */
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Render Toasts */}
            <div className="toast-container">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            className={`toast ${toast.type}`}
                            initial={{ opacity: 0, y: 50, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', minWidth: '20px' }}>
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            {toast.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
