import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { DateRangeProps } from '@/hooks/useCalendar';

import { Container, Day, DayWrapper, Label, TodayMark, TodayMarkWrapper, Wrapper } from './styles';

interface CalendarDayItemProps {
    isSelected: boolean;
    isToday: boolean;
    date: DateRangeProps;
    onPress?: () => void;
}

export function CalendarDayItem({
    isSelected = false,
    date,
    onPress,
    isToday = false,
}: CalendarDayItemProps) {
    const insertZeroBeforeDay = useCallback((day: number) => String(day).padStart(2, '0'), []);

    return (
        <TouchableOpacity onPress={onPress}>
            <Wrapper>
                <Container isSelected={isSelected}>
                    <Label isSelected={isSelected}>{date.dayName ?? 'DOM'}</Label>
                    <DayWrapper isSelected={isSelected}>
                        <Day isSelected={isSelected}>{insertZeroBeforeDay(date.day) ?? '01'}</Day>
                    </DayWrapper>
                </Container>
                {isToday && (
                    <TodayMarkWrapper>
                        <TodayMark />
                    </TodayMarkWrapper>
                )}
            </Wrapper>
        </TouchableOpacity>
    );
}
