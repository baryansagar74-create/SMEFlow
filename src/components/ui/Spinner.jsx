/**
 * Spinner — Loading indicator.
 * size: sm (16px) | md (24px) | lg (40px)
 * color: 'gold' | 'white' | 'teal'
 */
function Spinner({ size = 'md', color = 'gold', className = '' }) {
    const px = { sm: 16, md: 24, lg: 40 }[size] ?? 24;
    const stroke = {
        gold: '#F0B90B',
        white: 'rgba(255,255,255,0.9)',
        teal: '#2F5D6E',
    }[color] ?? '#F0B90B';

    return (
        <span
            className={`spinner ${className}`}
            role="status"
            aria-label="Loading"
            style={{ display: 'inline-flex', width: px, height: px }}
        >
            <svg
                width={px}
                height={px}
                viewBox="0 0 24 24"
                fill="none"
                style={{ animation: 'spin 0.8s linear infinite' }}
            >
                <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="2.5" strokeOpacity="0.2" />
                <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke={stroke}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    );
}

export default Spinner;
