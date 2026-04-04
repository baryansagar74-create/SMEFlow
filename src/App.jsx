import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Spinner from '@/components/ui/Spinner';
import { ROUTES } from '@/constants/routes';

/* ===== LAZY-LOADED PAGES ===== */
const LandingPage       = lazy(() => import('@/pages/LandingPage'));
const Login             = lazy(() => import('@/pages/Login'));
const Dashboard         = lazy(() => import('@/pages/Dashboard'));
const Features          = lazy(() => import('@/pages/Features'));
const Pricing           = lazy(() => import('@/pages/Pricing'));
const About             = lazy(() => import('@/pages/About'));
const Contact           = lazy(() => import('@/pages/Contact'));
const NotFound          = lazy(() => import('@/pages/NotFound'));

/* ===== FALLBACK ===== */
function PageLoader() {
    return (
        <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            minHeight:      '60vh',
        }}>
            <Spinner size="lg" color="teal" />
        </div>
    );
}

/* ===== APP ===== */
function App() {
    return (
        <Router>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    {/* ===== STANDALONE (no Layout) ===== */}
                    <Route path={ROUTES.HOME}  element={<LandingPage />} />
                    <Route path={ROUTES.LOGIN} element={<Login />} />

                    {/* ===== PROTECTED ===== */}
                    <Route
                        path={ROUTES.DASHBOARD}
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* ===== MAIN SITE (with Layout: Header + Footer) ===== */}
                    <Route element={<Layout />}>
                        <Route path={ROUTES.FEATURES} element={<Features />} />
                        <Route path={ROUTES.PRICING}  element={<Pricing />} />
                        <Route path={ROUTES.ABOUT}    element={<About />} />
                        <Route path={ROUTES.CONTACT}  element={<Contact />} />
                    </Route>

                    {/* ===== 404 ===== */}
                    <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
