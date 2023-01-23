import { eachDayOfInterval, endOfYear, startOfYear } from 'date-fns';

interface DateRangeProps {
  day: number;
  month: number;
  year: number;
  fullDate: string;
  dayName: string;
  monthName: string;
}

export function useCalendar(yearLimit = new Date().getFullYear()) {
  const start = startOfYear(new Date());
  const end = endOfYear(new Date());

  const interval = eachDayOfInterval(
    { start, end },
    {
      step: 1,
    }
  );

  const dateRange: DateRangeProps[] = [];

  interval.forEach(int => {
    const day = int?.getDate();
    const month = int?.getMonth() + 1;
    const year = int.getFullYear();
    const monthName = int.toLocaleDateString('pt-BR', { month: 'long' });
    const dayName = int.toLocaleDateString('pt-BR', { weekday: 'short' });
    const fullDate = int.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    dateRange.push({ day, month, year, fullDate, dayName, monthName });
  });

  console.log(dateRange);
}
