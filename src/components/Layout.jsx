/* ===== IMPORTS ===== */
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';

/* ===== LAYOUT COMPONENT ===== */
function Layout() {
    const location = useLocation();

    /* ===== HELPERS ===== */
    const getHeaderTitle = () => {
        switch (location.pathname) {
            case '/': return 'SMEFLOW';
            case '/features': return 'FEATURES';
            case '/pricing': return 'PRICING';
            case '/about': return 'ABOUT US';
            case '/contact': return 'CONTACT';
            case '/automated-follow-ups': return 'FOLLOW UPS';
            case '/landing-page': return 'WELCOME';
            case '/lead-management': return 'LEADS';
            default: return 'SMEFLOW';
        }
    };

    /* ===== RENDER ===== */
    return (
        <>
            <Header title={getHeaderTitle()} />
            <main>
                <AnimatePresence mode="wait">
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}

export default Layout;
