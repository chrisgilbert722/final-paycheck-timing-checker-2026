export interface FinalPaycheckInput {
    state: string;
    separationReason: 'quit' | 'fired' | 'laid_off';
    lastDayWorked: string; // ISO date string
    payFrequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly';
}

export interface TimingFactor {
    factor: string;
    value: string;
    description: string;
}

export interface FinalPaycheckResult {
    estimatedDeadline: string;
    deadlineDate: Date | null;
    isSameDay: boolean;
    isNextPayday: boolean;
    daysUntilDue: number;
    factors: TimingFactor[];
    timingRules: string[];
    message: string;
}

// State final paycheck rules (days until due)
// Format: { quit: days, fired: days, laid_off: days }
const STATE_RULES: Record<string, { quit: number | 'next_payday'; fired: number | 'next_payday'; laid_off: number | 'next_payday' }> = {
    'CA': { quit: 72, fired: 0, laid_off: 0 }, // 72 hours for quit, immediate for fired
    'CO': { quit: 'next_payday', fired: 0, laid_off: 0 },
    'CT': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'DC': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'HI': { quit: 'next_payday', fired: 0, laid_off: 0 },
    'IL': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'MA': { quit: 'next_payday', fired: 0, laid_off: 0 },
    'MI': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'MN': { quit: 'next_payday', fired: 0, laid_off: 0 },
    'MO': { quit: 'next_payday', fired: 0, laid_off: 0 },
    'MT': { quit: 'next_payday', fired: 0, laid_off: 0 },
    'NV': { quit: 7, fired: 0, laid_off: 0 },
    'NH': { quit: 'next_payday', fired: 3, laid_off: 3 },
    'NY': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'NC': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'OR': { quit: 5, fired: 0, laid_off: 0 },
    'PA': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'TX': { quit: 'next_payday', fired: 6, laid_off: 6 },
    'UT': { quit: 'next_payday', fired: 1, laid_off: 1 },
    'WA': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
    'WI': { quit: 'next_payday', fired: 'next_payday', laid_off: 'next_payday' },
};

function getNextPayday(lastDay: Date, payFrequency: string): Date {
    const result = new Date(lastDay);
    switch (payFrequency) {
        case 'weekly':
            result.setDate(result.getDate() + 7);
            break;
        case 'biweekly':
            result.setDate(result.getDate() + 14);
            break;
        case 'semimonthly':
            result.setDate(result.getDate() + 15);
            break;
        case 'monthly':
            result.setMonth(result.getMonth() + 1);
            break;
        default:
            result.setDate(result.getDate() + 14);
    }
    return result;
}

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = date2.getTime() - date1.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateFinalPaycheck(input: FinalPaycheckInput): FinalPaycheckResult {
    const { state, separationReason, lastDayWorked, payFrequency } = input;

    const factors: TimingFactor[] = [];
    const timingRules: string[] = [];

    const stateUpper = state.toUpperCase();
    const stateRule = STATE_RULES[stateUpper];
    const lastDay = new Date(lastDayWorked);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add state factor
    factors.push({
        factor: 'State',
        value: stateUpper,
        description: stateRule ? 'Has specific final pay laws' : 'Follows general guidelines'
    });

    // Add separation reason factor
    const reasonLabels: Record<string, string> = {
        'quit': 'Voluntary Resignation',
        'fired': 'Termination',
        'laid_off': 'Layoff'
    };
    factors.push({
        factor: 'Separation Type',
        value: reasonLabels[separationReason],
        description: separationReason === 'fired' ? 'Often requires faster payment' : 'Standard timing applies'
    });

    // Add pay frequency factor
    const freqLabels: Record<string, string> = {
        'weekly': 'Weekly',
        'biweekly': 'Bi-weekly',
        'semimonthly': 'Semi-monthly',
        'monthly': 'Monthly'
    };
    factors.push({
        factor: 'Pay Frequency',
        value: freqLabels[payFrequency],
        description: 'Affects next regular payday calculation'
    });

    let deadlineDate: Date | null = null;
    let isSameDay = false;
    let isNextPayday = false;
    let estimatedDeadline = '';

    if (stateRule) {
        const rule = stateRule[separationReason];

        if (rule === 0) {
            isSameDay = true;
            deadlineDate = new Date(lastDay);
            estimatedDeadline = 'Same day as separation';
            timingRules.push(`${stateUpper} requires immediate payment upon ${separationReason === 'fired' ? 'termination' : 'layoff'}`);
        } else if (rule === 'next_payday') {
            isNextPayday = true;
            deadlineDate = getNextPayday(lastDay, payFrequency);
            estimatedDeadline = formatDate(deadlineDate);
            timingRules.push(`${stateUpper} requires payment by next regular payday`);
        } else {
            deadlineDate = new Date(lastDay);
            deadlineDate.setDate(deadlineDate.getDate() + rule);
            estimatedDeadline = formatDate(deadlineDate);
            timingRules.push(`${stateUpper} requires payment within ${rule} day${rule > 1 ? 's' : ''}`);
        }
    } else {
        // Default: next payday
        isNextPayday = true;
        deadlineDate = getNextPayday(lastDay, payFrequency);
        estimatedDeadline = formatDate(deadlineDate);
        timingRules.push('No specific state law - typically due by next regular payday');
    }

    // Add last day worked factor
    factors.push({
        factor: 'Last Day Worked',
        value: formatDate(lastDay),
        description: 'Start date for deadline calculation'
    });

    // Calculate days until due
    const daysUntilDue = deadlineDate ? getDaysDifference(today, deadlineDate) : 0;

    // Generate message
    let message: string;
    if (isSameDay) {
        message = 'Final pay estimated to be due immediately upon separation';
    } else if (daysUntilDue < 0) {
        message = `Final pay was estimated to be due ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) > 1 ? 's' : ''} ago`;
    } else if (daysUntilDue === 0) {
        message = 'Final pay estimated to be due today';
    } else {
        message = `Final pay estimated to be due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}`;
    }

    return {
        estimatedDeadline,
        deadlineDate,
        isSameDay,
        isNextPayday,
        daysUntilDue,
        factors,
        timingRules,
        message
    };
}
