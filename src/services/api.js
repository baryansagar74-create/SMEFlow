/* ===== SUPABASE API SERVICE ===== */
import supabase from '@/lib/supabase';

/* ============================================================
   INQUIRIES
   ============================================================ */

/** Fetch all inquiries, newest first. */
export const fetchInquiries = async () => {
    const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
};

/** Submit a new inquiry from the Contact form. */
export const postInquiry = async (inquiryData) => {
    const { data, error } = await supabase
        .from('inquiries')
        .insert([{
            name:    inquiryData.name,
            email:   inquiryData.email,
            company: inquiryData.company,
            message: inquiryData.message,
        }])
        .select();
    if (error) throw error;
    return data;
};

/** Update the status of an inquiry (not_started | in_process | done). */
export const updateInquiryStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', id)
        .select();
    if (error) throw error;
    return data;
};

/** Bulk delete inquiries by array of IDs. */
export const bulkDeleteInquiries = async (ids) => {
    if (!ids || ids.length === 0) return;
    const { error } = await supabase
        .from('inquiries')
        .delete()
        .in('id', ids);
    if (error) throw error;
};

/* ============================================================
   PRICING PLANS
   ============================================================ */

export const fetchPricingPlans = async () => {
    const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('display_order', { ascending: true });
    if (error) throw error;
    return data;
};

export const createPricingPlan = async (plan) => {
    const { data, error } = await supabase
        .from('pricing_plans')
        .insert([plan])
        .select();
    if (error) throw error;
    return data;
};

export const updatePricingPlan = async (id, updates) => {
    const { data, error } = await supabase
        .from('pricing_plans')
        .update(updates)
        .eq('id', id)
        .select();
    if (error) throw error;
    return data;
};

export const deletePricingPlan = async (id) => {
    const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

/* ============================================================
   TEAM MEMBERS
   ============================================================ */

export const fetchTeamMembers = async () => {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });
    if (error) throw error;
    return data;
};

export const createTeamMember = async (member) => {
    const { data, error } = await supabase
        .from('team_members')
        .insert([member])
        .select();
    if (error) throw error;
    return data;
};

export const updateTeamMember = async (id, updates) => {
    const { data, error } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', id)
        .select();
    if (error) throw error;
    return data;
};

export const deleteTeamMember = async (id) => {
    const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);
    if (error) throw error;
};

/* ============================================================
   FAQs
   ============================================================ */

export const fetchFAQs = async () => {
    const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });
    if (error) throw error;
    return data;
};

export const createFAQ = async (faq) => {
    const { data, error } = await supabase
        .from('faqs')
        .insert([faq])
        .select();
    if (error) throw error;
    return data;
};

export const updateFAQ = async (id, updates) => {
    const { data, error } = await supabase
        .from('faqs')
        .update(updates)
        .eq('id', id)
        .select();
    if (error) throw error;
    return data;
};

export const deleteFAQ = async (id) => {
    const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
    if (error) throw error;
};
