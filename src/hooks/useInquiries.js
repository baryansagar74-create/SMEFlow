import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchInquiries, updateInquiryStatus, bulkDeleteInquiries } from '@/services/api';
import { STATUS_SORT_ORDER } from '@/constants/status';
import { useToast } from '@/context/ToastContext';

/**
 * Custom hook encapsulating all inquiry business logic.
 * Extracted from Dashboard.jsx to keep the component UI-only.
 */
export function useInquiries() {
    const { toast } = useToast();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /* Filters */
    const [searchQuery, setSearchQuery]   = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy]             = useState('newest');

    /* ===== LOAD ===== */
    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchInquiries();
            setInquiries(data ?? []);
        } catch (err) {
            setError(err.message ?? 'Failed to load inquiries.');
            toast.error('Failed to load inquiries.');
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => { load(); }, [load]);

    /* ===== STATUS CHANGE ===== */
    const changeStatus = useCallback(async (id, newStatus) => {
        try {
            await updateInquiryStatus(id, newStatus);
            setInquiries((prev) =>
                prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
            );
            toast.success('Status updated.');
        } catch {
            toast.error('Failed to update status.');
        }
    }, [toast]);

    /* ===== CLEAR DONE ===== */
    const clearCompleted = useCallback(async () => {
        const doneIds = inquiries
            .filter((inq) => inq.status === 'done')
            .map((inq) => inq.id);

        if (doneIds.length === 0) {
            toast.info('No completed inquiries to clear.');
            return false;
        }

        try {
            await bulkDeleteInquiries(doneIds);
            setInquiries((prev) => prev.filter((inq) => inq.status !== 'done'));
            toast.success(`Cleared ${doneIds.length} completed inquiries.`);
            return true;
        } catch {
            toast.error('Failed to clear. Check Supabase DELETE policy.');
            return false;
        }
    }, [inquiries, toast]);

    /* ===== FILTERED + SORTED ===== */
    const filtered = useMemo(() => {
        const q = searchQuery.toLowerCase().trim();

        const result = inquiries.filter((inq) => {
            const statusMatch =
                statusFilter === 'all' ||
                (inq.status ?? 'not_started') === statusFilter;

            if (!q) return statusMatch;

            const textMatch =
                (inq.name    ?? '').toLowerCase().includes(q) ||
                (inq.email   ?? '').toLowerCase().includes(q) ||
                (inq.company ?? '').toLowerCase().includes(q) ||
                (inq.message ?? '').toLowerCase().includes(q);

            return statusMatch && textMatch;
        });

        return [...result].sort((a, b) => {
            switch (sortBy) {
                case 'newest':    return new Date(b.created_at) - new Date(a.created_at);
                case 'oldest':    return new Date(a.created_at) - new Date(b.created_at);
                case 'name_asc':  return (a.name ?? '').localeCompare(b.name ?? '');
                case 'name_desc': return (b.name ?? '').localeCompare(a.name ?? '');
                case 'status': {
                    const orderA = STATUS_SORT_ORDER[a.status ?? 'not_started'] ?? 0;
                    const orderB = STATUS_SORT_ORDER[b.status ?? 'not_started'] ?? 0;
                    return orderA - orderB;
                }
                default: return 0;
            }
        });
    }, [inquiries, searchQuery, statusFilter, sortBy]);

    /* ===== COUNTS ===== */
    const counts = useMemo(() => {
        const c = { all: inquiries.length, not_started: 0, in_process: 0, done: 0 };
        inquiries.forEach((inq) => {
            const s = inq.status ?? 'not_started';
            if (c[s] !== undefined) c[s]++;
        });
        return c;
    }, [inquiries]);

    return {
        /* Data */
        filtered,
        counts,
        total:         inquiries.length,
        doneCount:     counts.done,
        loading,
        error,
        /* Filters */
        searchQuery,   setSearchQuery,
        statusFilter,  setStatusFilter,
        sortBy,        setSortBy,
        /* Actions */
        refresh:       load,
        changeStatus,
        clearCompleted,
    };
}
