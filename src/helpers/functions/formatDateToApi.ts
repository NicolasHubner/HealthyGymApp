import { format } from 'date-fns';

export function formatDateToApi(date: Date) {
    return String(format(date, 'yyyy/MM/dd')?.replaceAll('/', '-'));
}
