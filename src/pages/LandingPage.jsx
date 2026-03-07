/* ===== IMPORTS ===== */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ===== LANDING PAGE COMPONENT ===== */
function LandingPage() {
    /* ===== STATE & HOOKS ===== */
    const [opacity, setOpacity] = useState(0);
    const navigate = useNavigate();

    /* ===== EFFECTS ===== */
    useEffect(() => {
        /* Fade in on mount */
        setOpacity(1);

        /* Create the background styles */
        document.body.style.overflow = 'hidden';

        return () => {
            /* Cleanup */
            document.body.style.overflow = 'auto';
        };
    }, []);

    /* ===== EVENT HANDLERS ===== */
    const handleLinkClick = (e, target) => {
        e.preventDefault();
        setOpacity(0);
        setTimeout(() => {
            navigate(target);
        }, 500);
    };

    /* ===== RENDER ===== */
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100vw', height: '100vh', background: '#E9E2D0' }}
        >
            <section className="hero-landing">
                <motion.img
                    src="/robot-hand.jpg"
                    alt="Human and Robot Touch"
                    className="hero-landing-img"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />

                <motion.div
                    className="nav-landing"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="page-link">Home</Link>
                </motion.div>

                <motion.div
                    className="giant-text"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                >
                    SMEFlow
                </motion.div>

                <motion.div
                    className="tagline"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
                >
                    Where Human Vision Meets Intelligent Automation.
                </motion.div>
            </section>

            <motion.footer
                className="site-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                © {new Date().getFullYear()} SMEFlow™ — Crafted with Precision. All Rights Reserved.
            </motion.footer>
        </motion.div>
    );
}

export default LandingPage;
