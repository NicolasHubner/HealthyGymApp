import { format, subMonths } from 'date-fns';

export function getLastSixMonths() {
    const today = new Date();
    const lastMonths = [];

    for (let i = 0; i < 6; i++) {
        lastMonths.push(format(subMonths(today, i), 'MMM'));
    }

    return lastMonths.reverse();
}
