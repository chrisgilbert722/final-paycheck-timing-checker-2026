import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ textAlign: 'center' }}>
            <h1>Final Paycheck Timing Checker (2026)</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)' }}>
                Estimate when your final paycheck may be due based on state laws
            </p>
        </header>
    );
};
