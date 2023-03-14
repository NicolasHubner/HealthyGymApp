import { eachDayOfInterval, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface DateRangeProps {
    day: number;
    month: number;
    year: number;
    dayName: string;
    fullLongDate: string;
    defaultDateFormat: Date;
}

function getUsefulDataFromInterval(date: Date): DateRangeProps {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayName = format(date, 'EEEEEE', { locale: ptBR });
    const defaultDateFormat = date;
    const fullLongDate = format(date, 'PPPP', { locale: ptBR });

    return { day, month, year, dayName, fullLongDate, defaultDateFormat };
}

export function useCalendar(yearLimit = new Date().getFullYear()) {
    const dayStart = 1;
    const monthStart = new Date().getMonth() - 1;
    const yearStart = new Date().getFullYear();

    const monthLimit = monthStart + 4;

    const start = new Date(yearStart, monthStart, dayStart);
    const end = new Date(yearLimit, monthLimit, 31);

    const interval = eachDayOfInterval(
        { start, end },
        {
            step: 1,
        }
    );

    const dateRange: DateRangeProps[] = [];

    interval.forEach(int => {
        const date = getUsefulDataFromInterval(int);

        dateRange.push(date);
    });

    return dateRange;
}
