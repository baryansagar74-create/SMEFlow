import { useState, useEffect } from 'react';

/**
 * useScrolled — returns true when page scroll > threshold.
 * Extracted from Header to be a reusable hook.
 *
 * @param {number} threshold - scroll Y px before returning true (default: 20)
 */
export function useScrolled(threshold = 20) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > threshold);

        /* Set initial state */
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return scrolled;
}
