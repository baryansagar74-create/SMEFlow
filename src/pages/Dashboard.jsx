import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useInquiries } from '@/hooks/useInquiries';
import StatCard from '@/features/dashboard/StatCard';
import InquiryCard from '@/features/dashboard/InquiryCard';
import InquiryFilters from '@/features/dashboard/InquiryFilters';
import ContentManager from '@/components/ContentManager';
import SkeletonCard from '@/components/ui/SkeletonCard';
import EmptyState from '@/components/ui/EmptyState';
import { ROUTES } from '@/constants/routes';

/* ===== STAT CARD DEFINITIONS ===== */
const STAT_DEFS = [
    { key: 'all',         label: 'Total',       color: '#F0B90B', icon: '📩' },
    { key: 'not_started', label: 'New',          color: '#EF4444', icon: '🔴' },
    { key: 'in_process',  label: 'In Progress',  color: '#F0B90B', icon: '🟡' },
    { key: 'done',        label: 'Completed',    color: '#22C55E', icon: '🟢' },
];

function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { toast } = useToast();
    const {
        filtered, counts, doneCount, loading, error,
        searchQuery, setSearchQuery,
        statusFilter, setStatusFilter,
        sortBy, setSortBy,
        refresh, changeStatus, clearCompleted,
    } = useInquiries();

    /* Settings modal */
    const [showSettings, setShowSettings]     = useState(false);
    const [showConfirmClear, setShowConfirmClear] = useState(false);
    const [clearing, setClearing]             = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate(ROUTES.HOME);
    };

    const handleClearDone = async () => {
        setClearing(true);
        const ok = await clearCompleted();
        setClearing(false);
        if (ok) setShowConfirmClear(false);
    };

    /* ===== RENDER ===== */
    return (
        <div className="dash-layout">
            <div className="dash-inner">

                {/* ===== TOP BAR ===== */}
                <div className="dash-topbar">
                    <div>
                        <div className="dash-live-badge">
                            <span className="dash-live-dot" aria-hidden="true" />
                            <span>LIVE</span>
                        </div>
                        <h1 className="dash-title">Admin Panel</h1>
                        <p className="dash-subtitle">
                            SMEFlow Control Center ·{' '}
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            {user?.email && ` · ${user.email}`}
                        </p>
                    </div>
                    <div className="dash-topbar__actions">
                        <button className="dash-btn dash-btn--ghost" onClick={() => navigate(ROUTES.HOME)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Home
                        </button>
                        <button className="dash-btn dash-btn--ghost" onClick={refresh} aria-label="Refresh data">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Refresh
                        </button>
                        <button className="dash-btn dash-btn--ghost" onClick={() => toast.info('Export feature coming soon!')}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Export
                        </button>
                        <button className="dash-btn dash-btn--primary" onClick={() => setShowSettings(true)} aria-label="Open settings">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/></svg>
                            Settings
                        </button>
                        <button className="dash-btn dash-btn--danger" onClick={handleLogout}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            Logout
                        </button>
                    </div>
                </div>

                {/* ===== STAT CARDS ===== */}
                <div className="dash-stats" role="region" aria-label="Inquiry statistics">
                    {STAT_DEFS.map((s, i) => (
                        <motion.div
                            key={s.key}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.3 }}
                        >
                            <StatCard
                                label={s.label}
                                value={counts[s.key] ?? 0}
                                color={s.color}
                                icon={s.icon}
                                isActive={statusFilter === s.key}
                                onClick={() => setStatusFilter(s.key)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* ===== FILTERS ===== */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                >
                    <InquiryFilters
                        searchQuery={searchQuery}   setSearchQuery={setSearchQuery}
                        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                        sortBy={sortBy}             setSortBy={setSortBy}
                        counts={counts}
                    />
                </motion.div>

                {/* ===== RESULTS BAR ===== */}
                <div className="dash-results-bar">
                    <p className="dash-results-text">
                        Showing <strong style={{ color: '#F0B90B' }}>{filtered.length}</strong> of <strong>{counts.all}</strong> inquiries
                    </p>
                </div>

                {/* ===== INQUIRY GRID ===== */}
                {loading ? (
                    <div className="inquiry-grid">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : error ? (
                    <EmptyState
                        icon={<svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/></svg>}
                        title="Failed to load inquiries"
                        description={error}
                        action={<button className="dash-btn dash-btn--primary" onClick={refresh}>Try Again</button>}
                    />
                ) : (
                    <div className="inquiry-grid">
                        <AnimatePresence mode="popLayout">
                            {filtered.length > 0 ? (
                                filtered.map((inq, idx) => (
                                    <InquiryCard
                                        key={inq.id}
                                        inquiry={inq}
                                        index={idx}
                                        onStatusChange={changeStatus}
                                    />
                                ))
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ gridColumn: '1 / -1' }}
                                >
                                    <EmptyState
                                        title={searchQuery || statusFilter !== 'all' ? 'No results found' : 'No inquiries yet'}
                                        description={searchQuery || statusFilter !== 'all'
                                            ? 'Try adjusting your search or filter.'
                                            : 'When customers submit the contact form, inquiries will appear here.'}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* ===== CONTENT MANAGEMENT ===== */}
                <motion.section
                    className="dash-section"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    aria-labelledby="content-mgmt-title"
                >
                    <div className="dash-section__header">
                        <h2 id="content-mgmt-title" className="dash-section__title">Content Management</h2>
                        <p className="dash-section__sub">Manage website content in real time</p>
                    </div>
                    <ContentManager />
                </motion.section>

                {/* ===== FOOTER ===== */}
                <div className="dash-footer">
                    <p>SMEFlow Admin · Powered by Supabase</p>
                </div>
            </div>

            {/* ===== SETTINGS MODAL ===== */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSettings(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="settings-title"
                    >
                        <motion.div
                            className="modal-panel"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2 id="settings-title" className="modal-title">Settings</h2>
                                <button
                                    className="modal-close"
                                    onClick={() => setShowSettings(false)}
                                    aria-label="Close settings"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                                </button>
                            </div>

                            {/* Data Management */}
                            <div className="modal-section modal-section--danger">
                                <h3 className="modal-section__title">Data Management</h3>
                                <p className="modal-section__desc">
                                    Permanently delete all inquiries marked as "Completed" from the database.
                                </p>
                                <button
                                    className="dash-btn dash-btn--danger"
                                    onClick={() => setShowConfirmClear(true)}
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    Clear {doneCount} Completed Inquiries
                                </button>

                                <AnimatePresence>
                                    {showConfirmClear && (
                                        <motion.div
                                            className="confirm-box"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <p className="confirm-box__text">
                                                This will permanently delete <strong>{doneCount}</strong> completed inquiries. This cannot be undone.
                                            </p>
                                            <div className="confirm-box__actions">
                                                <button
                                                    className="dash-btn dash-btn--ghost"
                                                    onClick={() => setShowConfirmClear(false)}
                                                    disabled={clearing}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="dash-btn dash-btn--danger"
                                                    onClick={handleClearDone}
                                                    disabled={clearing}
                                                    aria-busy={clearing}
                                                >
                                                    {clearing ? 'Deleting…' : 'Yes, Delete All'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Account Info */}
                            <div className="modal-section">
                                <h3 className="modal-section__title">Account</h3>
                                <p className="modal-section__desc">
                                    Signed in as <strong>{user?.email ?? 'Admin'}</strong>
                                </p>
                                <p className="modal-section__desc" style={{ marginTop: '0.5rem' }}>
                                    To change your password, visit your Supabase Auth settings or use the password reset flow.
                                </p>
                                <button className="dash-btn dash-btn--ghost" onClick={handleLogout} style={{ marginTop: '0.75rem' }}>
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Dashboard;
