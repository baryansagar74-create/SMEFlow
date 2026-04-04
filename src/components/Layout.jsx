import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';

function Layout() {
    const location = useLocation();

    return (
        <>
            <Header />
            <main id="main-content" tabIndex={-1}>
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
