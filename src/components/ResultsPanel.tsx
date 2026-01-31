import React from 'react';
import type { FinalPaycheckResult } from '../logic/finalPaycheckCalculations';

interface ResultsPanelProps {
    result: FinalPaycheckResult;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const getStatusColor = () => {
        if (result.isSameDay) return '#dc2626';
        if (result.daysUntilDue <= 3) return '#ea580c';
        return '#166534';
    };

    const getStatusBg = () => {
        if (result.isSameDay) return 'linear-gradient(to bottom, #FEF2F2, #FECACA)';
        if (result.daysUntilDue <= 3) return 'linear-gradient(to bottom, #FFFBEB, #FEF3C7)';
        return 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)';
    };

    const getBorderColor = () => {
        if (result.isSameDay) return '#FCA5A5';
        if (result.daysUntilDue <= 3) return '#FCD34D';
        return '#86EFAC';
    };

    const getTimingLabel = () => {
        if (result.isSameDay) return 'Same-Day Payment Required';
        if (result.isNextPayday) return 'Due by Next Payday';
        return 'Specific Deadline';
    };

    return (
        <div className="card" style={{
            background: getStatusBg(),
            borderColor: getBorderColor(),
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Final Paycheck Deadline
                </h2>
                <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: getStatusColor(),
                    lineHeight: 1.2,
                    letterSpacing: '-0.025em'
                }}>
                    {result.estimatedDeadline}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.message}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: `1px solid ${getBorderColor()}`
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TIMING TYPE</div>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: getStatusColor() }}>
                        {getTimingLabel()}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${getBorderColor()}`, borderRight: `1px solid ${getBorderColor()}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>DAYS UNTIL DUE</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {result.isSameDay ? 'Immediate' : result.daysUntilDue < 0 ? 'Overdue' : result.daysUntilDue}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>SAME DAY</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: result.isSameDay ? '#dc2626' : '#166534' }}>
                        {result.isSameDay ? 'Yes' : 'No'}
                    </div>
                </div>
            </div>
        </div>
    );
};
