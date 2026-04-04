/* ===== APP PROVIDERS — Compose all context providers ===== */
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';

/**
 * Wraps the app with all required providers in the correct order:
 * Toast → Auth (Auth can use toasts for error feedback)
 */
export function AppProviders({ children }) {
    return (
        <ToastProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ToastProvider>
    );
}
