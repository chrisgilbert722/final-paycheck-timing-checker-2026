import React from 'react';
import type { FinalPaycheckInput } from '../logic/finalPaycheckCalculations';

interface ScenarioControlsProps {
    values: FinalPaycheckInput;
    onChange: (field: keyof FinalPaycheckInput, value: number | boolean | string) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const separationOptions = [
        { label: 'Quit', value: 'quit' },
        { label: 'Fired', value: 'fired' },
        { label: 'Laid Off', value: 'laid_off' },
    ];

    const stateOptions = [
        { label: 'CA', value: 'CA' },
        { label: 'NY', value: 'NY' },
        { label: 'TX', value: 'TX' },
        { label: 'MA', value: 'MA' },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Separation Type Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Separation Type</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {separationOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('separationReason', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.separationReason === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.separationReason === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.separationReason === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* State Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>State</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {stateOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('state', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.state === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.state === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.state === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
