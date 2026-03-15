/* ===== IMPORTS ===== */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import AutomatedFollowUps from './pages/AutomatedFollowUps';
import LeadManagement from './pages/LeadManagement';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

/* ===== APP COMPONENT ===== */
function App() {
    /* ===== STATE ===== */
    const [isLoading, setIsLoading] = useState(true);

    /* ===== EFFECTS ===== */
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    /* ===== RENDER ===== */
    return (
        <AuthProvider>
            <Router>
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="global-loader"
                            className="global-loader"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
                        >
                            <motion.div
                                className="loader-logo"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                            >
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="#F5F3E7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                SMEFLOW
                            </motion.h2>
                        </motion.div>
                    ) : (
                        <Routes key="main-routes">
                            {/* ===== STANDALONE ROUTES (no Layout wrapper) ===== */}
                            <Route path="/landing-page" element={<LandingPage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />

                            {/* ===== MAIN SITE ROUTES (with Layout: Header + Footer) ===== */}
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="features" element={<Features />} />
                                <Route path="pricing" element={<Pricing />} />
                                <Route path="about" element={<About />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="automated-follow-ups" element={<AutomatedFollowUps />} />
                                <Route path="lead-management" element={<LeadManagement />} />
                            </Route>
                        </Routes>
                    )}
                </AnimatePresence>
            </Router>
        </AuthProvider>
    );
}

export default App;
