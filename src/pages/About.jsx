/* ===== IMPORTS ===== */
import React from 'react';
import { motion } from 'framer-motion';

/* ===== ABOUT PAGE COMPONENT ===== */
function About() {
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
            <motion.section
                className="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h1>SMALL BUSINESSES DESERVE ENTERPRISE INTELLIGENCE</h1>
                <p>
                    SMEFlow transforms operational chaos into organized digital systems.
                </p>
                <div className="divider"></div>
            </motion.section>

            <motion.section className="section-block" {...fadeInOptions}>
                <h2>OUR CORE PHILOSOPHY</h2>
                <p>
                    Operational clarity drives sustainable growth.
                </p>
            </motion.section>

            <section className="grid-section">
                <motion.h2 {...fadeInOptions}>WHY SMEFLOW IS DIFFERENT</motion.h2>
                <motion.div
                    className="grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="card" variants={staggerItem}>
                        <h3>MODULAR ARCHITECTURE</h3>
                        <p>Adopt what you need today. Expand as you grow tomorrow.</p>
                    </motion.div>
                    <motion.div className="card" variants={staggerItem}>
                        <h3>CONNECTED WORKFLOWS</h3>
                        <p>Leads, sales, tasks, and payments operate within one unified system.</p>
                    </motion.div>
                    <motion.div className="card" variants={staggerItem}>
                        <h3>AUTOMATION-FIRST DESIGN</h3>
                        <p>Rule-based triggers reduce human error and manual dependency.</p>
                    </motion.div>
                    <motion.div className="card" variants={staggerItem}>
                        <h3>AI-READY FOUNDATION</h3>
                        <p>Built to evolve into predictive analytics and intelligent insights.</p>
                    </motion.div>
                </motion.div>
            </section>

            <motion.section className="vision" {...fadeInOptions}>
                <h2>OUR VISION (3–5 YEARS)</h2>
                <p>
                    SMEFlow aims to become a complete SME Operating System.
                </p>
            </motion.section>

            <motion.section className="founder" {...fadeInOptions}>
                <h2>FOUNDER'S PERSPECTIVE</h2>
                <p>
                    SMEFlow was created to democratize operational intelligence.
                </p>
            </motion.section>

            <section className="team">
                <motion.h2 {...fadeInOptions}>FOUNDING TEAM</motion.h2>

                <motion.div
                    className="team-grid"
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div className="team-card" variants={staggerItem}>
                        <img src="/Person1.png" alt="Founder 1" className="team-img" />
                        <div className="team-name">Vishu Kumar</div>
                        <div className="team-role">Co-Founder & CEO</div>
                        <p>
                            Visionary leader driving product direction, strategic growth,
                            and long-term expansion across global markets.
                        </p>
                    </motion.div>

                    <motion.div className="team-card" variants={staggerItem}>
                        <img src="/Person2.png" alt="Founder 2" className="team-img" />
                        <div className="team-name">Aryan Kumar</div>
                        <div className="team-role">Co-Founder & CTO</div>
                        <p>
                            Architect of the platform’s technical infrastructure,
                            automation systems, and scalable backend architecture.
                        </p>
                    </motion.div>

                    <motion.div className="team-card" variants={staggerItem}>
                        <img src="/Person3.png" alt="Founder 3" className="team-img" />
                        <div className="team-name">Vaibhav Virat</div>
                        <div className="team-role">Co-Founder & COO</div>
                        <p>
                            Oversees operations, execution strategy, and ensures
                            seamless integration between product and customer success.
                        </p>
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
}

export default About;
