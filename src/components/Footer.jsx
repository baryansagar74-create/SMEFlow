/* ===== IMPORTS ===== */
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

/* ===== FOOTER COMPONENT ===== */
function Footer() {
    const { showToast } = useToast();
    const year = new Date().getFullYear();

    const handleComingSoon = (e) => {
        e.preventDefault();
        showToast('Feature Coming Soon!');
    };

    /* ===== RENDER ===== */
    return (
        <footer className="advanced-footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <div className="footer-badge">SF</div>
                    <h3>SMEFlow</h3>
                    <p>Powering small businesses with structured, intelligent automation.</p>
                </div>
                <div className="footer-links">
                    <h4>Platform</h4>
                    <Link to="/features">Features</Link>
                    <Link to="/pricing">Pricing</Link>
                    <Link to="/about">About Us</Link>
                </div>
                <div className="footer-links">
                    <h4>Resources</h4>
                    <Link to="/lead-management">Lead Management</Link>
                    <Link to="/automated-follow-ups">Automated Follow-ups</Link>
                    <Link to="/contact">Contact Support</Link>
                </div>
                <div className="footer-newsletter">
                    <h4>Stay Updated</h4>
                    <p>Get the latest updates on automation strategies.</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button onClick={handleComingSoon}>
                            Subscribe
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© {year} SMEFlow™. All Rights Reserved.</p>
                <div className="social-links">
                    <a href="#" onClick={handleComingSoon} aria-label="Twitter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 3.0113C22.0424 3.6761 20.9821 4.1923 19.86 4.5363C19.2577 3.8378 18.4573 3.3468 17.567 3.1242C16.6767 2.9016 15.7395 2.9575 14.8821 3.2847C14.0247 3.6119 13.2884 4.195 12.773 4.954C12.2575 5.713 11.9887 6.6116 12 7.5363V8.5363C10.2426 8.582 8.50127 8.1861 6.93101 7.385C5.36074 6.5838 4.01142 5.403 3 4.0363C3 4.0363 -1 13.0363 8 17.0363C5.94053 18.3983 3.48716 19.1002 1 19.0363C10 24.0363 21 19.0363 21 7.5363C20.9991 7.2579 20.9723 6.9804 20.92 6.7063C21.9406 5.6638 22.6608 4.393 23 3.0113Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#" onClick={handleComingSoon} aria-label="LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 8C17.5913 8 19.1174 8.6321 20.2426 9.7574C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.7574C12.8826 8.6321 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                    <a href="#" onClick={handleComingSoon} aria-label="Instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 11.3701C16.1234 12.2024 15.9813 13.0523 15.5938 13.7991C15.2063 14.5459 14.5932 15.1515 13.8416 15.5298C13.0901 15.9081 12.2385 16.0408 11.4078 15.9084C10.5771 15.776 9.80562 15.3853 9.20177 14.7916C8.59792 14.1979 8.19231 13.4326 8.04419 12.6045C7.89606 11.7764 8.01331 10.9272 8.37936 10.1787C8.7454 9.43026 9.34267 8.82136 10.0847 8.43851C10.8267 8.05566 11.6754 7.91899 12.5118 8.04943C13.3934 8.18737 14.1936 8.6508 14.7738 9.35824C15.3539 10.0657 15.6781 10.9744 15.69 11.9001C15.6961 12.3663 15.6179 12.8277 15.46 13.2601" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
