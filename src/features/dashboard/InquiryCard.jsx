import { motion } from 'framer-motion';
import { STATUS_OPTIONS, getStatusOption } from '@/constants/status';

/**
 * Individual inquiry card for the Dashboard.
 * Displays contact info, message preview, and status action buttons.
 */
function InquiryCard({ inquiry, onStatusChange, index }) {
    const currentStatus = getStatusOption(inquiry.status ?? 'not_started');

    const formatDate = (iso) =>
        new Date(iso).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
            className="inquiry-card"
            aria-label={`Inquiry from ${inquiry.name}`}
        >
            {/* ===== HEADER ===== */}
            <div className="inquiry-card__header">
                <div>
                    <h3 className="inquiry-card__name">{inquiry.name}</h3>
                    <time
                        className="inquiry-card__date"
                        dateTime={inquiry.created_at}
                    >
                        {formatDate(inquiry.created_at)}
                    </time>
                </div>
                <span
                    className="inquiry-card__badge"
                    style={{
                        '--badge-color': currentStatus.color,
                        background:     currentStatus.color + '18',
                        color:          currentStatus.color,
                        border:         `1px solid ${currentStatus.color}44`,
                    }}
                    aria-label={`Status: ${currentStatus.label}`}
                >
                    <span aria-hidden="true">{currentStatus.icon}</span>
                    {currentStatus.shortLabel}
                </span>
            </div>

            {/* ===== CONTACT ===== */}
            <div className="inquiry-card__contact">
                <a
                    href={`mailto:${inquiry.email}`}
                    className="inquiry-card__contact-row"
                    aria-label={`Email ${inquiry.name}`}
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M22 6 12 13 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {inquiry.email}
                </a>
                {inquiry.company && (
                    <div className="inquiry-card__contact-row">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {inquiry.company}
                    </div>
                )}
            </div>

            {/* ===== MESSAGE ===== */}
            <blockquote className="inquiry-card__message">
                "{inquiry.message}"
            </blockquote>

            {/* ===== STATUS ACTIONS ===== */}
            <div className="inquiry-card__actions" role="group" aria-label="Update status">
                {STATUS_OPTIONS.map((opt) => {
                    const isActive = (inquiry.status ?? 'not_started') === opt.value;
                    return (
                        <button
                            key={opt.value}
                            onClick={() => onStatusChange(inquiry.id, opt.value)}
                            className={`status-btn ${isActive ? 'status-btn--active' : ''}`}
                            style={{ '--status-color': opt.color }}
                            aria-pressed={isActive}
                            aria-label={`Mark as ${opt.label}`}
                        >
                            <span aria-hidden="true">{opt.icon}</span>
                            {opt.shortLabel}
                        </button>
                    );
                })}
            </div>
        </motion.article>
    );
}

export default InquiryCard;
