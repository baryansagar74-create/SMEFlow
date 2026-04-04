import { getStatusOption } from '@/constants/status';

/**
 * Status badge for inquiry cards.
 * Pass a status value (not_started | in_process | done) OR custom label+color.
 */
function Badge({ status, label, color, size = 'md' }) {
    const opt = status ? getStatusOption(status) : null;
    const displayLabel = label ?? opt?.label ?? 'Unknown';
    const displayColor = color ?? opt?.color ?? '#888';
    const icon = opt?.icon;

    return (
        <span
            className={`badge badge--${size}`}
            style={{
                backgroundColor: displayColor + '18',
                color:           displayColor,
                border:          `1px solid ${displayColor}44`,
            }}
        >
            {icon && <span aria-hidden="true">{icon}</span>}
            {displayLabel}
        </span>
    );
}

export default Badge;
