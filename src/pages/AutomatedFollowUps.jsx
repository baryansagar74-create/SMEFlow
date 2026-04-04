/* ===== IMPORTS ===== */
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

/* ===== AUTOMATED FOLLOW UPS COMPONENT ===== */
function AutomatedFollowUps() {
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
                <h2>NEVER MISS A CUSTOMER AGAIN</h2>
                <p>
                    Many businesses lose customers simply because follow-ups are forgotten.
                    SMEFlow automatically reminds your team, sends messages, and keeps
                    every lead active in the pipeline.
                </p>
            </motion.section>

            <section className="section workflow">
                <motion.h2 {...fadeInOptions}>HOW AUTOMATION WORKS</motion.h2>
                <motion.div
                    className="grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="box" variants={staggerItem}>
                        <h3>LEAD CREATED</h3>
                        <p>A new inquiry enters the system.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>AUTOMATIC TIMER</h3>
                        <p>SMEFlow starts a follow-up timer.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>MESSAGE SENT</h3>
                        <p>Automated reminder via email, SMS or WhatsApp.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>TEAM NOTIFIED</h3>
                        <p>Your team receives alerts if action is required.</p>
                    </motion.div>
                </motion.div>
            </section>

            <section className="section">
                <motion.h2 {...fadeInOptions}>AUTOMATION FEATURES</motion.h2>
                <motion.div
                    className="grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="box" variants={staggerItem}>
                        <h3>SCHEDULED FOLLOW-UPS</h3>
                        <p>Automatically send follow-up messages after defined intervals.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>SMART REMINDERS</h3>
                        <p>Notify team members when leads require attention.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>ESCALATION SYSTEM</h3>
                        <p>If a lead is ignored, the system alerts managers.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>PAYMENT REMINDERS</h3>
                        <p>Send automated reminders for pending invoices.</p>
                    </motion.div>
                </motion.div>
            </section>

            <section className="section">
                <motion.h2 {...fadeInOptions}>BUSINESS IMPACT</motion.h2>
                <motion.div
                    className="grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="box" variants={staggerItem}>
                        <h3>MORE CONVERSIONS</h3>
                        <p>Timely follow-ups increase customer conversion rates.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>FASTER RESPONSES</h3>
                        <p>Customers receive replies without delay.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>NO MISSED OPPORTUNITIES</h3>
                        <p>Every lead stays active until it converts.</p>
                    </motion.div>
                </motion.div>
            </section>

            <motion.section className="cta" {...fadeInOptions}>
                <h2>LET AUTOMATION HANDLE THE FOLLOW-UPS</h2>
                <button onClick={() => showToast('Feature Coming Soon!')}>START FREE TRIAL</button>
            </motion.section>
        </>
    );
}

export default AutomatedFollowUps;
