/* ===== TOAST CONTEXT ===== */
import { createContext, useContext, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext(null);

/* ===== ICONS ===== */
const ICONS = {
    success: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 4 12 14.01l-3-3" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    error: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2.5" />
            <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),
    warning: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m10.29 3.86-8.6 14.9A2 2 0 0 0 3.41 22H20.6a2 2 0 0 0 1.72-3l-8.59-14.9a2 2 0 0 0-3.44-.14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 9v4M12 17h.01" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),
    info: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="#CBBE9A" strokeWidth="2.5" />
            <path d="M12 8h.01M12 12v4" stroke="#CBBE9A" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    ),
};

const BORDER_COLOR = {
    success: '#22C55E',
    error:   '#EF4444',
    warning: '#F59E0B',
    info:    '#CBBE9A',
};

/* ===== TOAST RENDERER ===== */
function ToastContainer({ toasts, onDismiss }) {
    return (
        <div
            className="toast-container"
            role="region"
            aria-label="Notifications"
            aria-live="polite"
        >
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        className="toast"
                        role="alert"
                        style={{ borderLeftColor: BORDER_COLOR[toast.type] ?? BORDER_COLOR.info }}
                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 60, scale: 0.92, transition: { duration: 0.2 } }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >
                        <span className="toast-icon">{ICONS[toast.type] ?? ICONS.info}</span>
                        <span className="toast-message">{toast.message}</span>
                        <button
                            className="toast-dismiss"
                            onClick={() => onDismiss(toast.id)}
                            aria-label="Dismiss notification"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

/* ===== PROVIDER ===== */
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts((prev) => [...prev.slice(-4), { id, message, type }]);
        setTimeout(() => dismiss(id), duration);
    }, [dismiss]);

    /* Convenience methods */
    const toast = {
        success: (msg) => showToast(msg, 'success'),
        error:   (msg) => showToast(msg, 'error'),
        warning: (msg) => showToast(msg, 'warning'),
        info:    (msg) => showToast(msg, 'info'),
    };

    return (
        <ToastContext.Provider value={{ showToast, toast }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
}

/* ===== CUSTOM HOOK ===== */
export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used inside ToastProvider');
    return ctx;
}
