/* ===== IMPORTS ===== */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTeamMembers } from '../services/api';

/* ===== ABOUT PAGE COMPONENT ===== */
function About() {
    const [team, setTeam] = useState([]);
    const [teamLoading, setTeamLoading] = useState(true);

    /* Load team members from Supabase */
    useEffect(() => {
        const loadTeam = async () => {
            try {
                const data = await fetchTeamMembers();
                setTeam(data || []);
            } catch (err) {
                console.error('Error loading team members:', err);
            } finally {
                setTeamLoading(false);
            }
        };
        loadTeam();
    }, []);

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

                {teamLoading ? (
                    <p style={{ textAlign: 'center', color: '#CBBE9A' }}>Loading team...</p>
                ) : team.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'rgba(245,243,231,0.5)' }}>Team info coming soon.</p>
                ) : (
                    <motion.div
                        className="team-grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {team.map((member) => (
                            <motion.div className="team-card" variants={staggerItem} key={member.id}>
                                <img src={member.image_url} alt={member.name} className="team-img" />
                                <div className="team-name">{member.name}</div>
                                <div className="team-role">{member.role}</div>
                                <p>{member.bio}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>
        </>
    );
}

export default About;
