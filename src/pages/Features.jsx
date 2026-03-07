/* ===== IMPORTS ===== */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

/* ===== FEATURES PAGE COMPONENT ===== */
function Features() {
    const { showToast } = useToast();
    /* ===== ANIMATION VARIANTS ===== */
    const fadeInOptions = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const staggerContainer = {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: { staggerChildren: 0.15 }
    };

    const staggerItem = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    /* ===== RENDER ===== */
    return (
        <>
            <section className="features-section">
                <motion.h2 className="section-title" {...fadeInOptions}>WHAT SMEFLOW OFFERS</motion.h2>
                <motion.div className="section-sub" {...fadeInOptions}>
                    A modular automation platform built to help small and medium businesses
                    streamline operations, increase revenue visibility, and scale efficiently.
                </motion.div>

                <motion.div
                    className="features-grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <Link to="/lead-management" className="feature-link">
                        <motion.div className="feature-card" variants={staggerItem}>
                            <div className="circle">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>LEAD MANAGEMENT</h3>
                            <p>Centralize and organize customer inquiries with structured tracking and conversion visibility.</p>
                        </motion.div>
                    </Link>

                    <Link to="/automated-follow-ups" className="feature-link">
                        <motion.div className="feature-card" variants={staggerItem}>
                            <div className="circle">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h3>AUTOMATED FOLLOW UPS</h3>
                            <p>Rule-based reminders and smart notifications ensure no opportunity or payment is missed.</p>
                        </motion.div>
                    </Link>

                    <motion.div className="feature-card" variants={staggerItem}>
                        <div className="circle">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 12V22H2V2H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>SALES PIPELINE</h3>
                        <p>Stage-based deal management that provides clear forecasting and performance insights.</p>
                    </motion.div>

                    <motion.div className="feature-card" variants={staggerItem}>
                        <div className="circle">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>TASK MANAGEMENT</h3>
                        <p>Assign responsibilities, monitor deadlines, and maintain internal workflow clarity.</p>
                    </motion.div>

                    <motion.div className="feature-card" variants={staggerItem}>
                        <div className="circle">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 7C2 5.89543 2.89543 5 4 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>BILLING & PAYMENTS</h3>
                        <p>Generate invoices, track collections, and maintain financial transparency in one place.</p>
                    </motion.div>

                    <motion.div className="feature-card" variants={staggerItem}>
                        <div className="circle">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M18 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3>DASHBOARD & ANALYTICS</h3>
                        <p>Real-time operational insights that convert raw data into actionable business intelligence.</p>
                    </motion.div>
                </motion.div>
            </section>

            <motion.section className="cta" {...fadeInOptions}>
                <h2>READY TO STRUCTURE YOUR BUSINESS?</h2>
                <button onClick={() => showToast('Feature Coming Soon!')}>
                    GET STARTED
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '10px' }}>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </motion.section>
        </>
    );
}

export default Features;
