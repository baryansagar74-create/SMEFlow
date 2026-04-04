/**
 * EmptyState — shown when a list has no items.
 * Used in Dashboard, Content Manager, etc.
 */
function EmptyState({ icon, title, description, action }) {
    return (
        <div className="empty-state" role="status">
            {icon && (
                <div className="empty-state__icon" aria-hidden="true">
                    {icon}
                </div>
            )}
            <h3 className="empty-state__title">{title}</h3>
            {description && (
                <p className="empty-state__description">{description}</p>
            )}
            {action && (
                <div className="empty-state__action">{action}</div>
            )}
        </div>
    );
}

export default EmptyState;
