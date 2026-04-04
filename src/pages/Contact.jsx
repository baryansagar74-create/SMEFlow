import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import { postInquiry, fetchFAQs } from '@/services/api';

const FADE_UP = {
    initial:   { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport:  { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' },
};

function Contact() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
    const [errors, setErrors]     = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted]   = useState(false);
    const [faqs, setFaqs]         = useState([]);
    const [openFaqId, setOpenFaqId] = useState(null);

    useEffect(() => {
        fetchFAQs().then((data) => { if (data) setFaqs(data); }).catch(() => {});
    }, []);

    /* Validation */
    const validate = () => {
        const e = {};
        if (!formData.name.trim())  e.name    = 'Name is required.';
        if (!formData.email.trim()) e.email   = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email.';
        if (!formData.message.trim()) e.message = 'Message is required.';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }

        setSubmitting(true);
        try {
            await postInquiry(formData);
            setSubmitted(true);
            toast.success('Message sent! We\'ll respond within 24 hours.');
            setFormData({ name: '', email: '', company: '', message: '' });
        } catch {
            toast.error('Failed to send. Please try again or email us directly.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <motion.section className="section" {...FADE_UP}>
                <h2>Get In Touch</h2>
                <p>Have questions about SMEFlow? Send us a message and we'll respond within 24 hours.</p>

                <motion.div className="contact-grid" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ staggerChildren: 0.2 }}>

                    {/* Contact Form */}
                    <motion.div className="box" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                        <h3>Send a Message</h3>

                        {submitted ? (
                            <div className="contact-success">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="1.5"/><path d="M9 12l2 2 4-4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                <h4>Message Sent!</h4>
                                <p>Thank you — we'll be in touch within 24 hours.</p>
                                <button className="contact-success__again" onClick={() => setSubmitted(false)}>
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-field">
                                    <label htmlFor="contact-name" className="form-label">
                                        Full Name <span aria-hidden="true" className="form-required">*</span>
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                                        placeholder="John Smith"
                                        autoComplete="name"
                                        aria-required="true"
                                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                    />
                                    {errors.name && <p id="contact-name-error" className="form-error" role="alert">{errors.name}</p>}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="contact-email" className="form-label">
                                        Email Address <span aria-hidden="true" className="form-required">*</span>
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                                        placeholder="john@company.com"
                                        autoComplete="email"
                                        aria-required="true"
                                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                    />
                                    {errors.email && <p id="contact-email-error" className="form-error" role="alert">{errors.email}</p>}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="contact-company" className="form-label">Company Name</label>
                                    <input
                                        id="contact-company"
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="form-input"
                                        placeholder="Acme Corp (optional)"
                                        autoComplete="organization"
                                    />
                                </div>

                                <div className="form-field">
                                    <label htmlFor="contact-message" className="form-label">
                                        Message <span aria-hidden="true" className="form-required">*</span>
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`form-input form-textarea ${errors.message ? 'form-input--error' : ''}`}
                                        placeholder="Tell us about your business and how we can help…"
                                        rows={5}
                                        aria-required="true"
                                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                    />
                                    <div className="form-char-count">{formData.message.length} characters</div>
                                    {errors.message && <p id="contact-message-error" className="form-error" role="alert">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="contact-submit"
                                    disabled={submitting}
                                    aria-busy={submitting}
                                >
                                    {submitting ? 'Sending…' : 'Send Message'}
                                    {!submitting && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div className="box" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
                        <h3>Contact Information</h3>
                        <dl className="contact-info-list">
                            <div className="contact-info-item">
                                <dt>General</dt>
                                <dd><a href="mailto:hello@smeflow.ai">hello@smeflow.ai</a></dd>
                            </div>
                            <div className="contact-info-item">
                                <dt>Support</dt>
                                <dd><a href="mailto:support@smeflow.ai">support@smeflow.ai</a></dd>
                            </div>
                            <div className="contact-info-item">
                                <dt>Office</dt>
                                <dd>Global Remote Team</dd>
                            </div>
                            <div className="contact-info-item">
                                <dt>Response Time</dt>
                                <dd>Within 24 hours</dd>
                            </div>
                        </dl>

                        <div className="contact-trust">
                            <div className="contact-trust__item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                <span>Your data is always secure</span>
                            </div>
                            <div className="contact-trust__item">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#CBBE9A" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#CBBE9A" strokeWidth="2" strokeLinecap="round"/></svg>
                                <span>Fast response, always</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* FAQ */}
            {faqs.length > 0 && (
                <motion.section className="section" {...FADE_UP}>
                    <h2>Frequently Asked Questions</h2>
                    <p>Quick answers to common questions about SMEFlow.</p>
                    <div className="faq-list" style={{ maxWidth: 800, margin: '2rem auto 0' }}>
                        {faqs.map((faq) => (
                            <div key={faq.id} className={`faq-item ${openFaqId === faq.id ? 'faq-item--open' : ''}`}>
                                <button
                                    className="faq-item__trigger"
                                    onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                                    aria-expanded={openFaqId === faq.id}
                                    aria-controls={`faq-answer-${faq.id}`}
                                    id={`faq-trigger-${faq.id}`}
                                >
                                    {faq.question}
                                    <span className="faq-item__chevron" aria-hidden="true">▾</span>
                                </button>
                                {openFaqId === faq.id && (
                                    <motion.div
                                        id={`faq-answer-${faq.id}`}
                                        className="faq-item__answer"
                                        role="region"
                                        aria-labelledby={`faq-trigger-${faq.id}`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.section>
            )}
        </>
    );
}

export default Contact;
