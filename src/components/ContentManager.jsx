/* ===== IMPORTS ===== */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchPricingPlans, createPricingPlan, updatePricingPlan, deletePricingPlan,
    fetchTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember,
    fetchFAQs, createFAQ, updateFAQ, deleteFAQ
} from '../services/api';
import { useToast } from '../context/ToastContext';

/* ===== SHARED STYLES ===== */
const sectionCard = {
    backgroundColor: '#1E2128',
    borderRadius: '14px',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '1.5rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    marginBottom: '1.5rem'
};

const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#E8E6DF',
    fontSize: '0.85rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease'
};

const smallBtn = (color = '#F0B90B') => ({
    padding: '6px 14px',
    borderRadius: '6px',
    border: `1.5px solid ${color}44`,
    backgroundColor: `${color}15`,
    color: color,
    fontWeight: '700',
    fontSize: '0.72rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px'
});

const sectionHeader = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
};

const formContainer = {
    padding: '1.2rem',
    backgroundColor: 'rgba(240, 185, 11, 0.04)',
    borderRadius: '10px',
    border: '1.5px solid rgba(240, 185, 11, 0.15)',
    marginBottom: '1rem'
};

const formTitle = {
    margin: '0 0 0.8rem',
    fontSize: '0.82rem',
    color: '#F0B90B',
    fontWeight: '700',
    letterSpacing: '0.5px'
};

const itemRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 1rem',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.04)',
    transition: 'border-color 0.2s ease'
};

/* ===== CONTENT MANAGER COMPONENT ===== */
function ContentManager() {
    const { showToast } = useToast();

    /* ===== STATE ===== */
    const [activeTab, setActiveTab] = useState('pricing');
    const [plans, setPlans] = useState([]);
    const [members, setMembers] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    /* Form states */
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    /* ===== LOAD DATA ===== */
    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            try {
                const [p, m, f] = await Promise.all([
                    fetchPricingPlans(),
                    fetchTeamMembers(),
                    fetchFAQs()
                ]);
                setPlans(p || []);
                setMembers(m || []);
                setFaqs(f || []);
            } catch (err) {
                console.error('Error loading content:', err);
                showToast('Failed to load content data.');
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    /* ===== FORM HELPERS ===== */
    const resetForm = () => {
        setFormData({});
        setEditingId(null);
        setShowForm(false);
        setConfirmDeleteId(null);
    };

    const handleInput = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    /** Strip Supabase metadata before sending update. */
    const cleanFormData = (data, allowedFields) => {
        const clean = {};
        allowedFields.forEach(key => {
            if (data[key] !== undefined) clean[key] = data[key];
        });
        return clean;
    };

    /* ===== PRICING CRUD ===== */
    const PLAN_FIELDS = ['name', 'subtitle', 'price', 'features', 'button_text', 'is_popular', 'display_order'];

    const savePlan = async () => {
        if (!formData.name?.trim() || !formData.price?.trim()) {
            showToast('Plan name and price are required.');
            return;
        }
        setSaving(true);
        try {
            const clean = cleanFormData(formData, PLAN_FIELDS);
            if (editingId) {
                const [updated] = await updatePricingPlan(editingId, clean);
                setPlans(prev => prev.map(p => p.id === editingId ? updated : p));
                showToast('Plan updated!');
            } else {
                const [created] = await createPricingPlan({ ...clean, display_order: plans.length + 1 });
                setPlans(prev => [...prev, created]);
                showToast('Plan created!');
            }
            resetForm();
        } catch (err) {
            showToast('Error saving plan.');
        } finally {
            setSaving(false);
        }
    };

    const removePlan = async (id) => {
        setSaving(true);
        try {
            await deletePricingPlan(id);
            setPlans(prev => prev.filter(p => p.id !== id));
            showToast('Plan deleted.');
            setConfirmDeleteId(null);
        } catch (err) {
            showToast('Error deleting plan.');
        } finally {
            setSaving(false);
        }
    };

    /* ===== TEAM CRUD ===== */
    const MEMBER_FIELDS = ['name', 'role', 'bio', 'image_url', 'display_order'];

    const saveMember = async () => {
        if (!formData.name?.trim()) {
            showToast('Member name is required.');
            return;
        }
        setSaving(true);
        try {
            const clean = cleanFormData(formData, MEMBER_FIELDS);
            if (editingId) {
                const [updated] = await updateTeamMember(editingId, clean);
                setMembers(prev => prev.map(m => m.id === editingId ? updated : m));
                showToast('Member updated!');
            } else {
                const [created] = await createTeamMember({ ...clean, display_order: members.length + 1 });
                setMembers(prev => [...prev, created]);
                showToast('Member added!');
            }
            resetForm();
        } catch (err) {
            showToast('Error saving member.');
        } finally {
            setSaving(false);
        }
    };

    const removeMember = async (id) => {
        setSaving(true);
        try {
            await deleteTeamMember(id);
            setMembers(prev => prev.filter(m => m.id !== id));
            showToast('Member removed.');
            setConfirmDeleteId(null);
        } catch (err) {
            showToast('Error deleting member.');
        } finally {
            setSaving(false);
        }
    };

    /* ===== FAQ CRUD ===== */
    const FAQ_FIELDS = ['question', 'answer', 'display_order'];

    const saveFAQ = async () => {
        if (!formData.question?.trim() || !formData.answer?.trim()) {
            showToast('Both question and answer are required.');
            return;
        }
        setSaving(true);
        try {
            const clean = cleanFormData(formData, FAQ_FIELDS);
            if (editingId) {
                const [updated] = await updateFAQ(editingId, clean);
                setFaqs(prev => prev.map(f => f.id === editingId ? updated : f));
                showToast('FAQ updated!');
            } else {
                const [created] = await createFAQ({ ...clean, display_order: faqs.length + 1 });
                setFaqs(prev => [...prev, created]);
                showToast('FAQ added!');
            }
            resetForm();
        } catch (err) {
            showToast('Error saving FAQ.');
        } finally {
            setSaving(false);
        }
    };

    const removeFAQ = async (id) => {
        setSaving(true);
        try {
            await deleteFAQ(id);
            setFaqs(prev => prev.filter(f => f.id !== id));
            showToast('FAQ deleted.');
            setConfirmDeleteId(null);
        } catch (err) {
            showToast('Error deleting FAQ.');
        } finally {
            setSaving(false);
        }
    };

    /* ===== DELETE CONFIRMATION ===== */
    const renderDeleteConfirm = (id, onConfirm, label) => {
        if (confirmDeleteId !== id) return null;
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: '4px',
                    padding: '0.7rem 1rem',
                    backgroundColor: '#1A1D23',
                    border: '1.5px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                    zIndex: 10,
                    whiteSpace: 'nowrap'
                }}
            >
                <p style={{ margin: '0 0 0.4rem', fontSize: '0.75rem', color: '#EF4444', fontWeight: '700' }}>Delete {label}?</p>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => setConfirmDeleteId(null)} style={{ ...smallBtn('#6B7280'), fontSize: '0.68rem', padding: '4px 10px', backgroundColor: 'rgba(107,114,128,0.15)' }}>Cancel</button>
                    <button onClick={() => onConfirm(id)} disabled={saving} style={{ ...smallBtn('#EF4444'), fontSize: '0.68rem', padding: '4px 10px' }}>
                        {saving ? '...' : 'Delete'}
                    </button>
                </div>
            </motion.div>
        );
    };

    /* ===== TAB CONFIG ===== */
    const tabs = [
        { key: 'pricing', label: '💰 Pricing Plans', count: plans.length },
        { key: 'team', label: '👥 Team Members', count: members.length },
        { key: 'faqs', label: '📋 FAQs', count: faqs.length }
    ];

    const tabStyle = (isActive) => ({
        padding: '10px 22px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: isActive ? '#F0B90B' : 'rgba(255,255,255,0.06)',
        color: isActive ? '#111' : 'rgba(255,255,255,0.5)',
        fontWeight: '700',
        fontSize: '0.78rem',
        cursor: 'pointer',
        letterSpacing: '0.5px',
        transition: 'all 0.2s ease'
    });

    /* ===== RENDER ===== */
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.4)' }}>
                <div style={{ display: 'inline-block', width: '20px', height: '20px', border: '2.5px solid rgba(255,255,255,0.15)', borderTopColor: '#F0B90B', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '0.5rem' }} />
                <div>Loading content data...</div>
            </div>
        );
    }

    return (
        <div>
            {/* ===== TAB NAVIGATION ===== */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {tabs.map(tab => (
                    <button key={tab.key} onClick={() => { setActiveTab(tab.key); resetForm(); }} style={tabStyle(activeTab === tab.key)}>
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            {/* ===== PRICING TAB ===== */}
            {activeTab === 'pricing' && (
                <div style={sectionCard}>
                    <div style={sectionHeader}>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: '#F5F3E7', fontWeight: '700' }}>💰 Pricing Plans</h3>
                        <button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', subtitle: '', price: '', features: '', button_text: 'GET STARTED', is_popular: false }); }} style={smallBtn()}>
                            + Add Plan
                        </button>
                    </div>

                    {/* Form */}
                    <AnimatePresence>
                        {showForm && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                                <div style={formContainer}>
                                    <p style={formTitle}>{editingId ? '✏️ EDIT PLAN' : '➕ NEW PLAN'}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                                        <input style={inputStyle} placeholder="Plan Name (e.g. STARTER) *" value={formData.name || ''} onChange={e => handleInput('name', e.target.value)} />
                                        <input style={inputStyle} placeholder="Price (e.g. $9) *" value={formData.price || ''} onChange={e => handleInput('price', e.target.value)} />
                                        <input style={inputStyle} placeholder="Subtitle (e.g. Perfect for Solo)" value={formData.subtitle || ''} onChange={e => handleInput('subtitle', e.target.value)} />
                                        <input style={inputStyle} placeholder="Button Text" value={formData.button_text || ''} onChange={e => handleInput('button_text', e.target.value)} />
                                    </div>
                                    <textarea style={{ ...inputStyle, minHeight: '70px', resize: 'vertical', marginBottom: '0.6rem' }} placeholder="Features (one per line)" value={formData.features || ''} onChange={e => handleInput('features', e.target.value)} />
                                    {/* Features Preview */}
                                    {formData.features && (
                                        <div style={{ marginBottom: '0.6rem', padding: '0.5rem 0.8rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                                            Preview: {formData.features.split('\n').filter(Boolean).map((f, i) => <span key={i}>• {f}  </span>)}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.8rem' }}>
                                        <input type="checkbox" id="is_popular" checked={formData.is_popular || false} onChange={e => handleInput('is_popular', e.target.checked)} style={{ cursor: 'pointer' }} />
                                        <label htmlFor="is_popular" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>Mark as "MOST POPULAR" ⭐</label>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={savePlan} disabled={saving} style={smallBtn('#22C55E')}>
                                            {saving ? '⏳ Saving...' : `💾 ${editingId ? 'Update' : 'Save'}`}
                                        </button>
                                        <button onClick={resetForm} style={smallBtn('#EF4444')}>Cancel</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* List */}
                    {plans.length === 0 ? (
                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>No plans yet. Click "+ Add Plan" to create one.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {plans.map((plan, index) => (
                                <div key={plan.id} style={itemRow}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)', fontWeight: '700', minWidth: '18px' }}>#{index + 1}</span>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#F5F3E7' }}>
                                                {plan.name} {plan.is_popular && <span style={{ color: '#F0B90B', fontSize: '0.7rem', marginLeft: '6px' }}>⭐ POPULAR</span>}
                                            </div>
                                            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                                                {plan.price}/month • {plan.subtitle}
                                                {plan.features && <span> • {plan.features.split('\n').filter(Boolean).length} features</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.4rem', position: 'relative' }}>
                                        <button onClick={() => { setEditingId(plan.id); setFormData(plan); setShowForm(true); setConfirmDeleteId(null); }} style={smallBtn('#F0B90B')}>✏️</button>
                                        <button onClick={() => setConfirmDeleteId(confirmDeleteId === plan.id ? null : plan.id)} style={smallBtn('#EF4444')}>🗑️</button>
                                        {renderDeleteConfirm(plan.id, removePlan, 'plan')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ===== TEAM TAB ===== */}
            {activeTab === 'team' && (
                <div style={sectionCard}>
                    <div style={sectionHeader}>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: '#F5F3E7', fontWeight: '700' }}>👥 Team Members</h3>
                        <button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ name: '', role: '', bio: '', image_url: '' }); }} style={smallBtn()}>
                            + Add Member
                        </button>
                    </div>

                    <AnimatePresence>
                        {showForm && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                                <div style={formContainer}>
                                    <p style={formTitle}>{editingId ? '✏️ EDIT MEMBER' : '➕ NEW MEMBER'}</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                                        <input style={inputStyle} placeholder="Full Name *" value={formData.name || ''} onChange={e => handleInput('name', e.target.value)} />
                                        <input style={inputStyle} placeholder="Role (e.g. Co-Founder & CEO)" value={formData.role || ''} onChange={e => handleInput('role', e.target.value)} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                                        <input style={{ ...inputStyle, flex: 1 }} placeholder="Image URL (e.g. /Person1.png)" value={formData.image_url || ''} onChange={e => handleInput('image_url', e.target.value)} />
                                        {/* Image Preview */}
                                        {formData.image_url && (
                                            <img 
                                                src={formData.image_url} 
                                                alt="Preview" 
                                                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }}
                                                onError={e => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                    </div>
                                    <textarea style={{ ...inputStyle, minHeight: '60px', resize: 'vertical', marginBottom: '0.8rem' }} placeholder="Short bio" value={formData.bio || ''} onChange={e => handleInput('bio', e.target.value)} />
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={saveMember} disabled={saving} style={smallBtn('#22C55E')}>
                                            {saving ? '⏳ Saving...' : `💾 ${editingId ? 'Update' : 'Save'}`}
                                        </button>
                                        <button onClick={resetForm} style={smallBtn('#EF4444')}>Cancel</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {members.length === 0 ? (
                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>No team members yet. Click "+ Add Member" to create one.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {members.map((m, index) => (
                                <div key={m.id} style={itemRow}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)', fontWeight: '700', minWidth: '18px' }}>#{index + 1}</span>
                                        {m.image_url ? (
                                            <img src={m.image_url} alt={m.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }} />
                                        ) : (
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(240,185,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: '#F0B90B', fontWeight: '700' }}>
                                                {m.name?.charAt(0) || '?'}
                                            </div>
                                        )}
                                        <div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#F5F3E7' }}>{m.name}</div>
                                            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{m.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.4rem', position: 'relative' }}>
                                        <button onClick={() => { setEditingId(m.id); setFormData(m); setShowForm(true); setConfirmDeleteId(null); }} style={smallBtn('#F0B90B')}>✏️</button>
                                        <button onClick={() => setConfirmDeleteId(confirmDeleteId === m.id ? null : m.id)} style={smallBtn('#EF4444')}>🗑️</button>
                                        {renderDeleteConfirm(m.id, removeMember, 'member')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ===== FAQ TAB ===== */}
            {activeTab === 'faqs' && (
                <div style={sectionCard}>
                    <div style={sectionHeader}>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: '#F5F3E7', fontWeight: '700' }}>📋 FAQs</h3>
                        <button onClick={() => { setShowForm(true); setEditingId(null); setFormData({ question: '', answer: '' }); }} style={smallBtn()}>
                            + Add FAQ
                        </button>
                    </div>

                    <AnimatePresence>
                        {showForm && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                                <div style={formContainer}>
                                    <p style={formTitle}>{editingId ? '✏️ EDIT FAQ' : '➕ NEW FAQ'}</p>
                                    <input style={{ ...inputStyle, marginBottom: '0.6rem' }} placeholder="Question *" value={formData.question || ''} onChange={e => handleInput('question', e.target.value)} />
                                    <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', marginBottom: '0.8rem' }} placeholder="Answer *" value={formData.answer || ''} onChange={e => handleInput('answer', e.target.value)} />
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={saveFAQ} disabled={saving} style={smallBtn('#22C55E')}>
                                            {saving ? '⏳ Saving...' : `💾 ${editingId ? 'Update' : 'Save'}`}
                                        </button>
                                        <button onClick={resetForm} style={smallBtn('#EF4444')}>Cancel</button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {faqs.length === 0 ? (
                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem 0' }}>No FAQs yet. Click "+ Add FAQ" to create one.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {faqs.map((faq, index) => (
                                <div key={faq.id} style={{ ...itemRow, alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', gap: '0.8rem', flex: 1, marginRight: '1rem' }}>
                                        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)', fontWeight: '700', minWidth: '18px', paddingTop: '2px' }}>#{index + 1}</span>
                                        <div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#F5F3E7', marginBottom: '4px' }}>Q: {faq.question}</div>
                                            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>A: {faq.answer}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, position: 'relative' }}>
                                        <button onClick={() => { setEditingId(faq.id); setFormData(faq); setShowForm(true); setConfirmDeleteId(null); }} style={smallBtn('#F0B90B')}>✏️</button>
                                        <button onClick={() => setConfirmDeleteId(confirmDeleteId === faq.id ? null : faq.id)} style={smallBtn('#EF4444')}>🗑️</button>
                                        {renderDeleteConfirm(faq.id, removeFAQ, 'FAQ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ContentManager;
