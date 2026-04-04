import { STATUS_OPTIONS, getStatusOption } from '@/constants/status';

/**
 * Search + status filters + sort for Dashboard inquiries.
 * Extracted from Dashboard to keep it focused on layout.
 */
function InquiryFilters({
    searchQuery,   setSearchQuery,
    statusFilter,  setStatusFilter,
    sortBy,        setSortBy,
    counts,
}) {
    const SearchIcon = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );

    return (
        <div className="inquiry-filters">
            {/* Search */}
            <div className="inquiry-filters__search" role="search">
                <label htmlFor="inquiry-search" className="sr-only">Search inquiries</label>
                <SearchIcon />
                <input
                    id="inquiry-search"
                    type="search"
                    placeholder="Search by name, email, company…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="inquiry-filters__input"
                    autoComplete="off"
                />
                {searchQuery && (
                    <button
                        className="inquiry-filters__clear"
                        onClick={() => setSearchQuery('')}
                        aria-label="Clear search"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>

            <div className="inquiry-filters__row">
                {/* Status pills */}
                <div className="inquiry-filters__pills" role="group" aria-label="Filter by status">
                    <button
                        className={`filter-pill ${statusFilter === 'all' ? 'active' : ''}`}
                        onClick={() => setStatusFilter('all')}
                        aria-pressed={statusFilter === 'all'}
                    >
                        All ({counts.all})
                    </button>
                    {STATUS_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            className={`filter-pill ${statusFilter === opt.value ? 'active' : ''}`}
                            style={{ '--pill-color': opt.color }}
                            onClick={() => setStatusFilter(opt.value)}
                            aria-pressed={statusFilter === opt.value}
                        >
                            {opt.shortLabel} ({counts[opt.value]})
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <div className="inquiry-filters__sort">
                    <label htmlFor="sort-select" className="sr-only">Sort by</label>
                    <select
                        id="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="inquiry-filters__select"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="name_asc">Name A → Z</option>
                        <option value="name_desc">Name Z → A</option>
                        <option value="status">By Status</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default InquiryFilters;
