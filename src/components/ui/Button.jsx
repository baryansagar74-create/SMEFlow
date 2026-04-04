/**
 * Reusable Button component.
 *
 * Variants: primary | secondary | outline | ghost | danger
 * Sizes:    sm | md | lg
 */
function Button({
    children,
    variant = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'right',
    onClick,
    className = '',
    ...rest
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`btn btn--${variant} btn--${size} ${loading ? 'btn--loading' : ''} ${className}`}
            aria-busy={loading}
            {...rest}
        >
            {loading && (
                <span className="btn-spinner" aria-hidden="true" />
            )}
            {!loading && icon && iconPosition === 'left' && (
                <span className="btn-icon" aria-hidden="true">{icon}</span>
            )}
            <span>{children}</span>
            {!loading && icon && iconPosition === 'right' && (
                <span className="btn-icon" aria-hidden="true">{icon}</span>
            )}
        </button>
    );
}

export default Button;
