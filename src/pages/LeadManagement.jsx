/* ===== IMPORTS ===== */
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

/* ===== LEAD MANAGEMENT COMPONENT ===== */
function LeadManagement() {
    const { showToast } = useToast();
    /* ===== ANIMATION VARIANTS ===== */
    const fadeInOptions = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
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
            <motion.section className="section" {...fadeInOptions}>
                <h2>CAPTURE EVERY OPPORTUNITY</h2>
                <p>
                    SMEFlow Lead Management helps businesses capture and organize
                    customer inquiries in one structured system. Instead of tracking
                    leads across notebooks, spreadsheets, or scattered messages,
                    businesses can clearly monitor every opportunity in one place.
                </p>
            </motion.section>

            <section className="section">
                <motion.h2 {...fadeInOptions}>CORE CAPABILITIES</motion.h2>
                <motion.div
                    className="grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="box" variants={staggerItem}>
                        <h3>LEAD CAPTURE</h3>
                        <p>Collect leads from websites, social media, or manual entries.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>CENTRALIZED DATABASE</h3>
                        <p>All customer inquiries stored in one organized system.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>TEAM ASSIGNMENT</h3>
                        <p>Assign leads to specific team members for faster responses.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>COMMUNICATION HISTORY</h3>
                        <p>Maintain a record of interactions with potential customers.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>FOLLOW-UP TRACKING</h3>
                        <p>Track follow-ups to ensure no opportunity is missed.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>OPPORTUNITY VISIBILITY</h3>
                        <p>Managers can see active leads and sales progress instantly.</p>
                    </motion.div>
                </motion.div>
            </section>

            <section className="pipeline">
                <motion.h2 {...fadeInOptions}>THE LEAD PIPELINE</motion.h2>
                <motion.div
                    className="pipeline-grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="stage" variants={staggerItem}>NEW</motion.div>
                    <motion.div className="stage" variants={staggerItem}>CONTACTED</motion.div>
                    <motion.div className="stage" variants={staggerItem}>FOLLOW-UP</motion.div>
                    <motion.div className="stage" variants={staggerItem}>CONVERTED</motion.div>
                    <motion.div className="stage" variants={staggerItem}>LOST</motion.div>
                </motion.div>
            </section>

            <motion.section className="impact" {...fadeInOptions}>
                <h2>BUSINESS IMPACT</h2>
                <ul>
                    <li>Prevents missed customer opportunities</li>
                    <li>Improves response time to inquiries</li>
                    <li>Increases conversion rates</li>
                    <li>Provides full visibility of sales progress</li>
                    <li>Creates a structured lead management process</li>
                </ul>
            </motion.section>

            <motion.section className="cta" {...fadeInOptions}>
                <h2>STRUCTURE YOUR LEAD PIPELINE</h2>
                <button onClick={() => showToast('Feature Coming Soon!')}>START FREE TRIAL</button>
            </motion.section>
        </>
    );
}

export default LeadManagement;
