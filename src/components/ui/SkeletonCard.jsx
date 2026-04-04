/** Skeleton card shimmer for Dashboard loading state */
function SkeletonCard() {
    return (
        <div className="skeleton-card" aria-hidden="true">
            <div className="skeleton-card__header">
                <div className="skeleton-shimmer skeleton-shimmer--line skeleton-shimmer--lg" />
                <div className="skeleton-shimmer skeleton-shimmer--badge" />
            </div>
            <div className="skeleton-shimmer skeleton-shimmer--line" style={{ width: '60%' }} />
            <div className="skeleton-shimmer skeleton-shimmer--line" style={{ width: '40%' }} />
            <div className="skeleton-card__body">
                <div className="skeleton-shimmer skeleton-shimmer--block" />
            </div>
            <div className="skeleton-card__footer">
                <div className="skeleton-shimmer skeleton-shimmer--btn" />
                <div className="skeleton-shimmer skeleton-shimmer--btn" />
                <div className="skeleton-shimmer skeleton-shimmer--btn" />
            </div>
        </div>
    );
}

export default SkeletonCard;
