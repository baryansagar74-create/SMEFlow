import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from '@/app/providers/AppProviders';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import App from './App.jsx';
import './styles/tokens.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary>
            <AppProviders>
                <App />
            </AppProviders>
        </ErrorBoundary>
    </React.StrictMode>
);
