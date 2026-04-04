import { Component } from 'react';

/**
 * Global Error Boundary.
 * Catches unhandled render errors and shows a fallback UI
 * instead of a blank white screen.
 */
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('[ErrorBoundary]', error, info.componentStack);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div className="error-boundary">
                <div className="error-boundary__inner">
                    <div className="error-boundary__icon" aria-hidden="true">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="1.5" />
                            <path d="M12 8v4M12 16h.01" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <h1 className="error-boundary__title">Something went wrong</h1>
                    <p className="error-boundary__message">
                        An unexpected error occurred. Our team has been notified.
                    </p>
                    {this.state.error && (
                        <details className="error-boundary__details">
                            <summary>Error details</summary>
                            <pre>{this.state.error.toString()}</pre>
                        </details>
                    )}
                    <button className="error-boundary__btn" onClick={this.handleReset}>
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }
}
