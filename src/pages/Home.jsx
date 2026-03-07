/* ===== IMPORTS ===== */
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';

/* ===== HOME PAGE COMPONENT ===== */
function Home() {
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
        viewport: { once: true, margin: "-100px" },
        transition: { staggerChildren: 0.2 }
    };

    const staggerItem = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    /* ===== RENDER ===== */
    return (
        <>
            {/* ===== SHOWCASE ===== */}
            <motion.section
                className="showcase"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <img src="/robot-hand.jpg" alt="Automation" />
                <div className="showcase-caption">
                    “POWERING SMALL BUSINESSES WITH STRUCTURED AUTOMATION.”
                </div>
            </motion.section>

            {/* ===== PROBLEM ===== */}
            <motion.section className="section" {...fadeInOptions}>
                <h2>FROM CHAOS TO CONTROL</h2>
                <p>
                    Spreadsheets, notebooks, WhatsApp chats and disconnected tools create
                    confusion and inefficiency. SMEFlow converts manual chaos into a
                    structured, intelligent system.
                </p>
            </motion.section>

            {/* ===== WHY SMEFLOW ===== */}
            <section className="section">
                <motion.h2 {...fadeInOptions}>WHY SMEFLOW?</motion.h2>
                <motion.div className="grid" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>BUILT FOR SMEs</h3>
                        <p>Designed specifically for growing small and medium businesses.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>MODULAR STRUCTURE</h3>
                        <p>Add only the tools you need. Expand as you grow.</p>
                    </motion.div>
                    <motion.div className="box" variants={staggerItem}>
                        <h3>STRUCTURED GROWTH</h3>
                        <p>Track leads, tasks, sales and payments in one system.</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ===== AI ===== */}
            <section className="section ai">
                <motion.h2 {...fadeInOptions}>THE INTELLIGENT FUTURE</motion.h2>
                <motion.div className="grid" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                    <motion.div className="box" variants={staggerItem}><h3>REVENUE FORECASTING</h3></motion.div>
                    <motion.div className="box" variants={staggerItem}><h3>LEAD CONVERSION SCORING</h3></motion.div>
                    <motion.div className="box" variants={staggerItem}><h3>SMART INSIGHTS</h3></motion.div>
                </motion.div>
            </section>

            {/* ===== CTA ===== */}
            <motion.section className="cta" {...fadeInOptions}>
                <h2>READY TO STRUCTURE YOUR BUSINESS?</h2>
                <button onClick={() => showToast('Feature Coming Soon!')}>
                    START FREE TRIAL
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '10px' }}>
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </motion.section>
        </>
    );
}

export default Home;
