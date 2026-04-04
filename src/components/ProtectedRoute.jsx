import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/ui/Spinner';
import { ROUTES } from '@/constants/routes';

/**
 * Guards a route behind Supabase Auth session.
 * Shows a full-screen spinner while the session is loading.
 * Redirects to /login if unauthenticated, preserving the intended destination.
 */
function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    minHeight:      '100vh',
                    background:     'var(--dash-bg)',
                }}
                role="status"
                aria-label="Verifying authentication"
            >
                <Spinner size="lg" color="gold" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;
