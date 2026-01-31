import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This final paycheck timing checker estimates when your last paycheck may be due based on state
                labor laws and your separation type. These are estimates only and should not be considered
                legal advice. Actual deadlines vary by state, with some requiring immediate payment upon
                termination and others allowing payment by the next regular payday. Whether you quit, were
                fired, or laid off can affect timing requirements. Consult your state labor department or
                an employment attorney for specific guidance.
            </p>
        </div>
    );
};
