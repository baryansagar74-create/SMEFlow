import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrolled } from '@/hooks/useScrolled';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants/routes';

/* ===== ANIMATION PRESETS ===== */
const FADE_UP = (delay = 0) => ({
    initial:    { opacity: 0, y: 32 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const FADE_IN = (delay = 0) => ({
    initial:    { opacity: 0 },
    animate:    { opacity: 1 },
    transition: { duration: 0.6, delay },
});

/* ===== FEATURES DATA ===== */
const FEATURES = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ),
        title: 'Lead Management',
        desc:  'Centralize every inquiry. Track status, assign actions, and never lose a prospect again.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#CBBE9A" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ),
        title: 'Automated Follow-ups',
        desc:  'Rule-based reminders ensure every lead, payment, and task gets followed up — automatically.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ),
        title: 'Real-time Analytics',
        desc:  'Operational dashboards that convert raw data into actionable business intelligence.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ),
        title: 'Task Management',
        desc:  'Assign responsibilities, monitor deadlines, and maintain internal workflow clarity.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#CBBE9A" strokeWidth="2"/><path d="M2 10h20" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round"/></svg>
        ),
        title: 'Billing & Payments',
        desc:  'Generate invoices, track collections, and maintain complete financial transparency.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#CBBE9A" strokeWidth="2"/><path d="M12 16v-4M12 8h.01" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round"/></svg>
        ),
        title: 'AI Insights',
        desc:  'Revenue forecasting, lead scoring, and smart recommendations powered by AI.',
    },
];

/* ===== STATS DATA ===== */
const STATS = [
    { value: '500+',  label: 'Businesses' },
    { value: '40%',   label: 'Time Saved'  },
    { value: '3×',    label: 'Lead Conversion' },
    { value: '98%',   label: 'Satisfaction' },
];

/* ===== NAV LINKS ===== */
const NAV_LINKS = [
    { to: ROUTES.FEATURES, label: 'Features' },
    { to: ROUTES.PRICING,  label: 'Pricing'  },
    { to: ROUTES.ABOUT,    label: 'About'    },
    { to: ROUTES.CONTACT,  label: 'Contact'  },
];

/* ===== LANDING NAVBAR ===== */
function LandingNav({ scrolled }) {
    const { isAuthenticated } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <motion.nav
            className={`landing-nav ${scrolled ? 'landing-nav--scrolled' : ''}`}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            role="navigation"
            aria-label="Main navigation"
        >
            {/* Brand */}
            <div className="landing-nav__brand">
                <Link to={ROUTES.HOME} aria-label="SMEFlow — Home" className="landing-nav__logo">
                    <div className="landing-nav__badge" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17l10 5 10-5" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12l10 5 10-5" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span>SMEFlow</span>
                </Link>
            </div>

            {/* Desktop Links */}
            <ul className={`landing-nav__links ${menuOpen ? 'open' : ''}`} id="landing-nav-links" role="list">
                {NAV_LINKS.map(({ to, label }) => (
                    <li key={to}>
                        <Link to={to} className="landing-nav__link" onClick={() => setMenuOpen(false)}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Actions */}
            <div className="landing-nav__actions">
                {isAuthenticated ? (
                    <Link to={ROUTES.DASHBOARD} className="landing-nav__cta">
                        Dashboard →
                    </Link>
                ) : (
                    <>
                        <Link to={ROUTES.LOGIN} className="landing-nav__login">
                            Login
                        </Link>
                        <Link to={ROUTES.CONTACT} className="landing-nav__cta">
                            Get Started
                        </Link>
                    </>
                )}
            </div>

            {/* Mobile toggle */}
            <button
                className={`landing-nav__toggle ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="landing-nav-links"
            >
                <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            </button>
        </motion.nav>
    );
}

/* ===== LANDING PAGE ===== */
function LandingPage() {
    const scrolled = useScrolled(60);

    return (
        <div className="landing-page">
            <LandingNav scrolled={scrolled} />

            {/* ===== HERO ===== */}
            <section className="landing-hero" aria-label="Hero">
                {/* Background image with overlay */}
                <div className="landing-hero__bg" aria-hidden="true">
                    <img
                        src="/robot-hand.webp"
                        alt=""
                        className="landing-hero__img"
                        loading="eager"
                        onError={(e) => { e.target.src = '/robot-hand.jpg'; }}
                    />
                    <div className="landing-hero__overlay" />
                </div>

                {/* Hero content */}
                <div className="landing-hero__content">
                    <motion.div className="landing-hero__badge" {...FADE_UP(0.3)}>
                        <span className="landing-hero__badge-dot" aria-hidden="true" />
                        Now accepting early access
                        <span className="landing-hero__badge-arrow" aria-hidden="true">→</span>
                    </motion.div>

                    <motion.h1 className="landing-hero__title" {...FADE_UP(0.5)}>
                        From Chaos<br />to Control.
                    </motion.h1>

                    <motion.p className="landing-hero__subtitle" {...FADE_UP(0.7)}>
                        SMEFlow brings structured automation to small and medium businesses —
                        leads, payments, follow-ups, and insights, unified in one intelligent platform.
                    </motion.p>

                    <motion.div className="landing-hero__actions" {...FADE_UP(0.9)}>
                        <Link to={ROUTES.CONTACT} className="landing-btn landing-btn--primary">
                            Start Free Trial
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to={ROUTES.FEATURES} className="landing-btn landing-btn--ghost">
                            See Features
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="landing-hero__scroll"
                    {...FADE_IN(1.4)}
                    aria-hidden="true"
                >
                    <span />
                </motion.div>
            </section>

            {/* ===== STATS BAR ===== */}
            <section className="landing-stats" aria-label="Key metrics">
                <div className="landing-container">
                    <motion.div
                        className="landing-stats__grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="landing-stat"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="landing-stat__value">{stat.value}</div>
                                <div className="landing-stat__label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== PROBLEM / SOLUTION ===== */}
            <section className="landing-problem" aria-labelledby="problem-heading">
                <div className="landing-container landing-container--narrow">
                    <motion.span
                        className="landing-eyebrow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        The Problem
                    </motion.span>
                    <motion.h2
                        id="problem-heading"
                        className="landing-section-title"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Most SMEs run on spreadsheets,{' '}
                        <span className="landing-highlight">WhatsApp, and guesswork.</span>
                    </motion.h2>
                    <motion.p
                        className="landing-section-sub"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        Leads fall through cracks. Payments get missed. Teams lose context.
                        SMEFlow replaces the chaos with a structured, intelligent system —
                        so you can focus on growing, not managing.
                    </motion.p>
                </div>
            </section>

            {/* ===== FEATURES GRID ===== */}
            <section className="landing-features" aria-labelledby="features-heading">
                <div className="landing-container">
                    <motion.span
                        className="landing-eyebrow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        What SMEFlow Offers
                    </motion.span>
                    <motion.h2
                        id="features-heading"
                        className="landing-section-title"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Every tool your business needs.{' '}
                        <span className="landing-highlight">In one place.</span>
                    </motion.h2>

                    <div className="landing-features__grid" role="list">
                        {FEATURES.map((feat, i) => (
                            <motion.div
                                key={feat.title}
                                className="landing-feature-card"
                                role="listitem"
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="landing-feature-card__icon" aria-hidden="true">
                                    {feat.icon}
                                </div>
                                <h3 className="landing-feature-card__title">{feat.title}</h3>
                                <p className="landing-feature-card__desc">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="landing-features__cta">
                        <Link to={ROUTES.FEATURES} className="landing-btn landing-btn--outline">
                            Explore All Features →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="landing-cta" aria-labelledby="cta-heading">
                <div className="landing-container landing-container--narrow">
                    <motion.h2
                        id="cta-heading"
                        className="landing-cta__title"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        Ready to structure your business?
                    </motion.h2>
                    <motion.p
                        className="landing-cta__sub"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        Join 500+ growing businesses already using SMEFlow.
                        Start free — no credit card required.
                    </motion.p>
                    <motion.div
                        className="landing-cta__actions"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link to={ROUTES.CONTACT} className="landing-btn landing-btn--primary landing-btn--lg">
                            Start Free Trial
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to={ROUTES.PRICING} className="landing-btn landing-btn--ghost">
                            View Pricing
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* ===== MINI FOOTER ===== */}
            <footer className="landing-footer">
                <div className="landing-container landing-footer__inner">
                    <p className="landing-footer__copy">
                        © {new Date().getFullYear()} SMEFlow™ — Crafted with precision. All rights reserved.
                    </p>
                    <nav className="landing-footer__links" aria-label="Footer navigation">
                        {NAV_LINKS.map(({ to, label }) => (
                            <Link key={to} to={to} className="landing-footer__link">{label}</Link>
                        ))}
                        <Link to={ROUTES.LOGIN} className="landing-footer__link">Login</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
