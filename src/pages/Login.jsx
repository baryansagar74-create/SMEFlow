import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { ROUTES } from '@/constants/routes';

/* ===== ANIMATION PRESETS ===== */
const FADE_UP = {
    initial:    { opacity: 0, y: 24 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

function Login() {
    const { login } = useAuth();
    const { toast } = useToast();
    const navigate  = useNavigate();
    const location  = useLocation();

    const [email,    setEmail]    = useState('');
    const [password, setPassword] = useState('');
    const [loading,  setLoading]  = useState(false);
    const [showPwd,  setShowPwd]  = useState(false);

    const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) { toast.error('Please enter your email address.'); return; }
        if (!password)     { toast.error('Please enter your password.'); return; }

        setLoading(true);
        const { error } = await login(email.trim(), password);
        setLoading(false);

        if (error) {
            toast.error('Invalid credentials. Please try again.');
            setPassword('');
        } else {
            toast.success('Welcome back!');
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="login-page">
            {/* Background gradient */}
            <div className="login-page__bg" aria-hidden="true" />

            <motion.div className="login-card" {...FADE_UP}>
                {/* Logo */}
                <div className="login-card__logo" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17l10 5 10-5" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12l10 5 10-5" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <div className="login-card__header">
                    <h1 className="login-card__title">Welcome back</h1>
                    <p className="login-card__subtitle">Sign in to your SMEFlow admin account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit} noValidate>
                    {/* Email */}
                    <div className="form-field">
                        <label htmlFor="login-email" className="form-label">Email address</label>
                        <input
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="admin@company.com"
                            autoComplete="email"
                            autoFocus
                            required
                            aria-required="true"
                        />
                    </div>

                    {/* Password */}
                    <div className="form-field">
                        <label htmlFor="login-password" className="form-label">Password</label>
                        <div className="form-input-wrapper">
                            <input
                                id="login-password"
                                type={showPwd ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-input"
                                placeholder="Your password"
                                autoComplete="current-password"
                                required
                                aria-required="true"
                            />
                            <button
                                type="button"
                                className="form-input__toggle"
                                onClick={() => setShowPwd((v) => !v)}
                                aria-label={showPwd ? 'Hide password' : 'Show password'}
                            >
                                {showPwd ? (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                        aria-busy={loading}
                    >
                        {loading ? (
                            <>
                                <span className="btn-spinner btn-spinner--white" aria-hidden="true" />
                                Signing in…
                            </>
                        ) : (
                            <>
                                Sign In
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                <p className="login-card__footer">
                    <Link to={ROUTES.HOME} className="login-back-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to home
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default Login;
