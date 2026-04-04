import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrolled } from '@/hooks/useScrolled';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants/routes';

/* ===== NAV LINKS ===== */
const NAV_LINKS = [
    { to: ROUTES.FEATURES, label: 'Features' },
    { to: ROUTES.PRICING,  label: 'Pricing'  },
    { to: ROUTES.ABOUT,    label: 'About'    },
    { to: ROUTES.CONTACT,  label: 'Contact'  },
];

function Header() {
    const scrolled = useScrolled(30);
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    /* Close mobile menu on route change */
    useMemo(() => { setMenuOpen(false); }, [location.pathname]);

    const isActive = (path) => location.pathname === path;

    const ARROW = (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12H19M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <header className={`site-header ${scrolled ? 'scrolled-header' : ''}`}>
            <nav
                className={`navbar ${scrolled ? 'scrolled' : ''}`}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Brand */}
                <div className="nav-brand">
                    <Link to={ROUTES.HOME} aria-label="SMEFlow — Home">
                        <div className="nav-badge" aria-hidden="true">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17l10 5 10-5" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12l10 5 10-5" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="nav-logo-text">SMEFlow</span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <ul className={`nav-links ${menuOpen ? 'active' : ''}`} role="list">
                    {NAV_LINKS.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className={isActive(to) ? 'active' : ''}
                                aria-current={isActive(to) ? 'page' : undefined}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <li>
                            <Link
                                to={ROUTES.DASHBOARD}
                                className={`nav-dashboard-link ${isActive(ROUTES.DASHBOARD) ? 'active' : ''}`}
                                aria-current={isActive(ROUTES.DASHBOARD) ? 'page' : undefined}
                            >
                                Dashboard
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Actions */}
                <div className="nav-actions">
                    {isAuthenticated ? (
                        <button
                            className="nav-btn nav-btn--ghost"
                            onClick={logout}
                            aria-label="Sign out"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <Link to={ROUTES.LOGIN} className="nav-btn nav-btn--ghost">
                                Login
                            </Link>
                            <Link to={ROUTES.CONTACT} className="nav-btn">
                                Get Started {ARROW}
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                >
                    <div className={`hamburger ${menuOpen ? 'open' : ''}`} aria-hidden="true">
                        <span /><span /><span />
                    </div>
                </button>
            </nav>

            {/* Page title block (shown in non-scrolled state) */}
            <div className="header-original-content" aria-hidden="true">
                <div className="badge">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17l10 5 10-5" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 12l10 5 10-5" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="retro-title-small">SMEFlow</div>
            </div>
        </header>
    );
}

export default Header;
