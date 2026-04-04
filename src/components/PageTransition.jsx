/* ===== IMPORTS ===== */
import { motion } from 'framer-motion';

/* ===== PAGE TRANSITION WRAPPER ===== */
function PageTransition({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}

export default PageTransition;
