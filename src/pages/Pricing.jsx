/* ===== IMPORTS ===== */
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

/* ===== PRICING PAGE COMPONENT ===== */
function Pricing() {
    const { showToast } = useToast();

    const handleComingSoon = (e) => {
        e.preventDefault();
        showToast('Feature Coming Soon!');
    };

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
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    };

    /* ===== RENDER ===== */
    return (
        <>
            <section className="pricing-section">
                <motion.div
                    className="pricing-grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="pricing-card" variants={staggerItem}>
                        <h2>STARTER</h2>
                        <div className="plan-sub">Perfect for Solo Operators</div>
                        <div className="price">$9 <span>/month</span></div>
                        <ul>
                            <li>Lead Management</li>
                            <li>Follow-Up Automation</li>
                            <li>Basic Dashboard</li>
                            <li>Up to 3 Users</li>
                        </ul>
                        <a href="#" className="button" onClick={handleComingSoon}>
                            GET STARTED
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </motion.div>

                    <motion.div className="pricing-card highlight" variants={staggerItem}>
                        <div className="ribbon">MOST POPULAR</div>
                        <h2>GROWTH</h2>
                        <div className="plan-sub">For Growing Teams</div>
                        <div className="price">$19 <span>/month</span></div>
                        <ul>
                            <li>Everything in Starter</li>
                            <li>Sales Pipeline</li>
                            <li>Task Management</li>
                            <li>Advanced Reporting</li>
                            <li>Up to 10 Users</li>
                        </ul>
                        <a href="#" className="button" onClick={handleComingSoon}>
                            UPGRADE NOW
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </motion.div>

                    <motion.div className="pricing-card" variants={staggerItem}>
                        <h2>PRO</h2>
                        <div className="plan-sub">Complete Operational Control</div>
                        <div className="price">$39 <span>/month</span></div>
                        <ul>
                            <li>Everything in Growth</li>
                            <li>Billing & Payments</li>
                            <li>Advanced Automation</li>
                            <li>Priority Support</li>
                            <li>25 Users</li>
                        </ul>
                        <a href="#" className="button" onClick={handleComingSoon}>
                            GO PRO
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            <motion.section className="ai-section" {...fadeInOptions}>
                <h2>SMEFLOW AI</h2>
                <p>
                    Add predictive intelligence to your workflow — conversion scoring,
                    revenue forecasting, and smart automation insights.
                </p>
                <div className="ai-price">$15 /month Add-On</div>
            </motion.section>
        </>
    );
}

export default Pricing;
