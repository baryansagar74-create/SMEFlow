import { motion } from 'framer-motion';

/** Stat card for the Dashboard top metrics bar */
function StatCard({ label, value, color, icon, onClick, isActive }) {
    return (
        <motion.button
            type="button"
            onClick={onClick}
            className={`stat-card ${isActive ? 'stat-card--active' : ''}`}
            style={{ '--stat-color': color }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            aria-pressed={isActive}
            aria-label={`Filter by ${label}: ${value} items`}
        >
            <span className="stat-card__icon" aria-hidden="true">{icon}</span>
            <div className="stat-card__body">
                <div className="stat-card__value">{value}</div>
                <div className="stat-card__label">{label}</div>
            </div>
        </motion.button>
    );
}

export default StatCard;
