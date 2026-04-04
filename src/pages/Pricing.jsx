import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { fetchPricingPlans } from '@/services/api';
import Spinner from '@/components/ui/Spinner';

const FADE_UP = {
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-100px' },
    transition:  { duration: 0.6, ease: 'easeOut' },
};

function Pricing() {
    const { toast } = useToast();
    const [plans, setPlans]     = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPricingPlans()
            .then((data) => setPlans(data || []))
            .catch(() => toast.error('Failed to load pricing plans.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="pricing-section" style={{ display: 'flex', justifyContent: 'center', padding: '6rem 2rem' }}>
                <Spinner size="lg" color="teal" />
            </section>
        );
    }

    if (plans.length === 0) {
        return (
            <section className="pricing-section" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                <h1>Pricing</h1>
                <p style={{ marginTop: '1rem' }}>Pricing plans are coming soon. Stay tuned!</p>
                <Link
                    to="/contact"
                    className="btn btn--primary"
                    style={{ display: 'inline-flex', marginTop: '2rem', textDecoration: 'none' }}
                >
                    Contact Us for Early Access
                </Link>
            </section>
        );
    }

    return (
        <>
            <section className="pricing-section">
                <motion.h1
                    className="section-title"
                    style={{ textAlign: 'center', marginBottom: '0.5rem' }}
                    {...FADE_UP}
                >
                    Simple, Transparent Pricing
                </motion.h1>
                <motion.p
                    style={{ textAlign: 'center', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}
                    {...FADE_UP}
                >
                    Start free and scale as you grow. No hidden fees, no surprises.
                </motion.p>

                <motion.div
                    className="pricing-grid"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    {plans.map((plan) => {
                        const features = (plan.features || '').split('\n').filter(Boolean);
                        return (
                            <motion.article
                                key={plan.id}
                                className={`pricing-card ${plan.is_popular ? 'highlight' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                aria-label={`${plan.name} plan — ${plan.price} per month`}
                            >
                                {plan.is_popular && (
                                    <div className="ribbon" aria-label="Most Popular Plan">
                                        Most Popular
                                    </div>
                                )}
                                <h2>{plan.name}</h2>
                                <div className="plan-sub">{plan.subtitle}</div>
                                <div className="price">
                                    {plan.price}
                                    <span aria-label="per month">/month</span>
                                </div>
                                <ul aria-label={`${plan.name} features`}>
                                    {features.map((feat, i) => (
                                        <li key={i}>
                                            <span aria-hidden="true">✓</span> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    type="button"
                                    className="button"
                                    onClick={() => toast.info('Signup flow coming soon! Contact us to get started.')}
                                    aria-label={`Choose ${plan.name} plan`}
                                >
                                    {plan.button_text || 'Get Started'}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </section>

            <motion.section className="ai-section" {...FADE_UP} aria-labelledby="ai-addon-title">
                <h2 id="ai-addon-title">SMEFlow AI</h2>
                <p>
                    Add predictive intelligence to your workflow — conversion scoring,
                    revenue forecasting, and smart automation insights.
                </p>
                <div className="ai-price" aria-label="AI add-on: $15 per month">$15 /month Add-On</div>
            </motion.section>
        </>
    );
}

export default Pricing;
