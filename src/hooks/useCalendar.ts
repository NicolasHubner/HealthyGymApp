import { eachDayOfInterval, endOfYear, startOfYear } from 'date-fns';

export interface DateRangeProps {
  day: number;
  month: number;
  year: number;
  dayName: string;
  fullLongDate: string;
  defaultDateFormat: Date;
}

function getUsefulDataFromInterval(interval: Date): DateRangeProps {
  const day = interval.getDate();
  const month = interval.getMonth() + 1;
  const year = interval.getFullYear();
  const dayName = interval.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  const defaultDateFormat = interval;
  const fullLongDate = interval.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return { day, month, year, dayName, fullLongDate, defaultDateFormat };
}

export function useCalendar(yearLimit = new Date().getFullYear()) {
  const start = startOfYear(new Date());
  const end = endOfYear(new Date(yearLimit, 11, 31));

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
