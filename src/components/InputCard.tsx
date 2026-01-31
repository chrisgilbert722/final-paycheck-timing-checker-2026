import React from 'react';
import type { FinalPaycheckInput } from '../logic/finalPaycheckCalculations';

interface InputCardProps {
    values: FinalPaycheckInput;
    onChange: (field: keyof FinalPaycheckInput, value: number | boolean | string) => void;
}

const selectStyle = {
    width: '100%',
    padding: 'var(--space-3)',
    fontSize: '1rem',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    background: '#fff'
};

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* State of Employment */}
                <div>
                    <label htmlFor="state">State of Employment</label>
                    <select
                        id="state"
                        value={values.state}
                        onChange={(e) => onChange('state', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DC">Washington D.C.</option>
                        <option value="HI">Hawaii</option>
                        <option value="IL">Illinois</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="WA">Washington</option>
                        <option value="WI">Wisconsin</option>
                        <option value="OTHER">Other State</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        State where work was performed
                    </span>
                </div>

                {/* Reason for Separation */}
                <div>
                    <label htmlFor="separationReason">Reason for Separation</label>
                    <select
                        id="separationReason"
                        value={values.separationReason}
                        onChange={(e) => onChange('separationReason', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="quit">Quit / Resigned</option>
                        <option value="fired">Fired / Terminated</option>
                        <option value="laid_off">Laid Off</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        How employment ended affects timing requirements
                    </span>
                </div>

                {/* Last Day Worked */}
                <div>
                    <label htmlFor="lastDayWorked">Last Day Worked</label>
                    <input
                        type="date"
                        id="lastDayWorked"
                        value={values.lastDayWorked}
                        onChange={(e) => onChange('lastDayWorked', e.target.value)}
                        style={selectStyle}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Final day of employment
                    </span>
                </div>

                {/* Pay Frequency */}
                <div>
                    <label htmlFor="payFrequency">Pay Frequency</label>
                    <select
                        id="payFrequency"
                        value={values.payFrequency}
                        onChange={(e) => onChange('payFrequency', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="semimonthly">Semi-monthly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        How often you are paid
                    </span>
                </div>
            </div>
        </div>
    );
};
