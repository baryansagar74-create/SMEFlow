/* ===== IMPORTS ===== */
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

/* ===== HEADER COMPONENT ===== */
function Header({ title }) {
    /* ===== STATE & HOOKS ===== */
    const { showToast } = useToast();
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    /* ===== EFFECTS ===== */
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /* Close menu when route changes */
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const isLanding = location.pathname === '/landing-page';

    /* No global header on landing page */
    if (isLanding) return null;

    /* ===== RENDER ===== */
    return (
        <header className={`site-header ${scrolled ? 'scrolled-header' : ''}`}>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-brand">
                    <Link to="/">
                        <div className="nav-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="nav-logo-text">SMEFlow</span>
                    </Link>
                </div>

                {/* Hamburger Icon */}
                <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>HOME</Link>
                    <Link to="/features" className={location.pathname === '/features' ? 'active' : ''}>FEATURES</Link>
                    <Link to="/pricing" className={location.pathname === '/pricing' ? 'active' : ''}>PRICING</Link>
                    <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ABOUT</Link>
                    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>CONTACT</Link>
                    {isAuthenticated && (
                        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''} style={{ color: "#F0B90B" }}>ADMIN</Link>
                    )}
                </div>

                <div className="nav-actions">
                    <button className="nav-btn" onClick={() => showToast('Feature Coming Soon!')}>
                        TRY FREE
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </nav>

            <div className="header-original-content">
                <div className="badge">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="retro-title-small">{title}</div>
            </div>
        </header>
    );
}

export default Header;
