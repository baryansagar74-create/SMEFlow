/**
 * Inquiry status configuration.
 * Single source of truth used by Dashboard, InquiryCard, InquiryFilters.
 */
export const STATUS_OPTIONS = [
    {
        value: 'not_started',
        label: 'Not Started',
        shortLabel: 'NEW',
        color: '#EF4444',
        icon: '○',
    },
    {
        value: 'in_process',
        label: 'In Progress',
        shortLabel: 'IN PROGRESS',
        color: '#F0B90B',
        icon: '◐',
    },
    {
        value: 'done',
        label: 'Completed',
        shortLabel: 'DONE',
        color: '#22C55E',
        icon: '●',
    },
];

/** Get a status option by value. */
export const getStatusOption = (value) =>
    STATUS_OPTIONS.find((s) => s.value === value) || STATUS_OPTIONS[0];

/** Sort order for statuses: not_started → in_process → done */
export const STATUS_SORT_ORDER = { not_started: 0, in_process: 1, done: 2 };
