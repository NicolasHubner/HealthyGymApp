import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { isToday } from 'date-fns';

import { CalendarDayItem } from '@/components/molecules/CalendarDayItem';
import { DateRangeProps, useCalendar } from '@/hooks/useCalendar';

import { Container, Divider } from './styles';

interface RenderCalendarItemProps {
  item: DateRangeProps;
}

export function DailyCalendar() {
  const [dailyCalendar, _] = useState(useCalendar(2024));
  const [selectedDate, setSelectedDate] = useState(dailyCalendar[0]);
  const [todayIndexOnDailyCalendar, setTodayIndexOnDailyCalendar] = useState(0);

  const setCorrectDatesIndexToStates = useCallback(() => {
    if (dailyCalendar.length <= 0) return;

    const findedTodayIndexOnCalendar = dailyCalendar.findIndex(item =>
      isToday(item.defaultDateFormat)
    );

    if (findedTodayIndexOnCalendar === -1) {
      setSelectedDate(dailyCalendar[0]);
      setTodayIndexOnDailyCalendar(0);
      return;
    }

    // findedTodayIndexOnCalendar - '2' = quantos dias antes de hoje serão mostrados
    setSelectedDate(dailyCalendar[findedTodayIndexOnCalendar]);
    setTodayIndexOnDailyCalendar(
      findedTodayIndexOnCalendar - 2 >= 0 ? findedTodayIndexOnCalendar - 2 : 0
    );
  }, [dailyCalendar]);

  const handleSelectDate = useCallback((date: DateRangeProps) => {
    setSelectedDate(date);
  }, []);

  const renderItem = useCallback(
    ({ item }: RenderCalendarItemProps) => (
      <CalendarDayItem
        isSelected={selectedDate.fullLongDate === item.fullLongDate}
        isToday={isToday(item.defaultDateFormat)}
        date={item}
        onPress={() => handleSelectDate(item)}
      />
    ),
    [selectedDate, handleSelectDate]
  );

  const renderSeparator = () => <Divider />;

  useEffect(() => {
    setCorrectDatesIndexToStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <FlatList
        horizontal
        data={dailyCalendar}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
        keyExtractor={item => item.fullLongDate}
        extraData={selectedDate}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={16}
        initialNumToRender={32}
        updateCellsBatchingPeriod={1000}
        windowSize={16}
        initialScrollIndex={todayIndexOnDailyCalendar ?? 0}
        bounces={false}
        bouncesZoom={false}
      />
    </Container>
  );
}
