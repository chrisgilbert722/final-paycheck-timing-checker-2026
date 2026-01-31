import React from 'react';
import type { FinalPaycheckResult } from '../logic/finalPaycheckCalculations';

interface BreakdownTableProps {
    result: FinalPaycheckResult;
}

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const renderFactorsTable = () => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {result.factors.map((factor, idx) => (
                    <tr key={idx} style={{
                        borderBottom: idx === result.factors.length - 1 ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {factor.factor}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: 600
                        }}>
                            {factor.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Timing Factors Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Key Timing Factors</h3>
            </div>
            {renderFactorsTable()}

            {/* Timing Rules Section */}
            {result.timingRules.length > 0 && (
                <>
                    <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0FDF4' }}>
                        <h3 style={{ fontSize: '1rem', color: '#166534' }}>Timing Rules Summary</h3>
                    </div>
                    <div style={{ padding: 'var(--space-4) var(--space-6)' }}>
                        <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                            {result.timingRules.map((rule, idx) => (
                                <li key={idx} style={{ marginBottom: idx < result.timingRules.length - 1 ? 'var(--space-2)' : 0 }}>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};
