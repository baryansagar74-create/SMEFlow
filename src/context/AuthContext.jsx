/* ===== SUPABASE AUTH CONTEXT ===== */
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import supabase from '@/lib/supabase';

const AuthContext = createContext(null);

/* ===== PROVIDER ===== */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    /* Bootstrap — read existing session on mount */
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        /* Listen for auth state changes (login, logout, token refresh) */
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    /**
     * Sign in with email + password via Supabase Auth.
     * Returns { error } — null error means success.
     */
    const login = useCallback(async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    }, []);

    /** Sign out the current user. */
    const logout = useCallback(async () => {
        await supabase.auth.signOut();
    }, []);

    const isAuthenticated = !!session;

    return (
        <AuthContext.Provider value={{ user, session, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/* ===== CUSTOM HOOK ===== */
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
