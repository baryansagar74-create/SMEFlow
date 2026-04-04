import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';

function NotFound() {
    return (
        <div className="not-found-page">
            <motion.div
                className="not-found-inner"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Large 404 */}
                <div className="not-found__code" aria-hidden="true">404</div>

                <h1 className="not-found__title">Page not found</h1>
                <p className="not-found__message">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="not-found__actions">
                    <Link to={ROUTES.HOME} className="not-found__btn not-found__btn--primary">
                        Go to Home
                    </Link>
                    <Link to={ROUTES.CONTACT} className="not-found__btn not-found__btn--ghost">
                        Contact Support
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default NotFound;
