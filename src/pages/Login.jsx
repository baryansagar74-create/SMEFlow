/* ===== IMPORTS ===== */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/* ===== LOGIN COMPONENT ===== */
function Login() {
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { showToast } = useToast();

    const from = location.state?.from?.pathname || '/admin';

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(password);
        if (success) {
            showToast("Login successful!");
            navigate(from, { replace: true });
        } else {
            showToast("Incorrect password. Access denied.");
            setPassword('');
        }
    };

    const fadeInOptions = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    return (
        <section className="section" style={{ 
            minHeight: "60vh", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center" 
        }}>
            <motion.div 
                className="box" 
                {...fadeInOptions}
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    padding: "3rem 2rem",
                    textAlign: "center"
                }}
            >
                <div style={{ marginBottom: "2rem" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.8 }}>
                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#F0B90B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#F0B90B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2 style={{ color: "#F0B90B" }}>ADMIN ACCESS REQUIRED</h2>
                <p style={{ marginBottom: "2rem" }}>
                    Enter the master password to access the admin dashboard.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input 
                        type="password" 
                        placeholder="Admin Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "1rem",
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "8px",
                            color: "#fff",
                            fontSize: "1rem"
                        }}
                    />
                    <button type="submit" style={{
                        padding: '14px 45px',
                        background: 'linear-gradient(135deg, #F0B90B 0%, #D4A008 100%)',
                        color: '#111315',
                        fontWeight: '700',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        marginTop: '10px',
                        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2), 0 5px 0px #A37A05',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        ACCESS ADMIN PANEL
                    </button>
                </form>
            </motion.div>
        </section>
    );
}

export default Login;
