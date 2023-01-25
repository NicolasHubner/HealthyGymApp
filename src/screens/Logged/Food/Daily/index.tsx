import React, { useCallback, useEffect, useState } from 'react';
import { CalendarDayItem } from '@/components/molecules/CalendarDayItem';
import { Container, Divider } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { DateRangeProps, useCalendar } from '@/hooks/useCalendar';
import { isToday } from 'date-fns';

interface RenderCalendarItemProps {
  item: DateRangeProps;
}

export function Daily() {
  const [dailyCalendar, _] = useState(useCalendar(2024));
  const [selectedDate, setSelectedDate] = useState(dailyCalendar[0]);
  const [todayIndexOnDailyCalendar, setTodayIndexOnDailyCalendar] = useState(0);

  const handleSelectDate = (date: DateRangeProps) => {
    setSelectedDate(date);
  };

  const renderItem = useCallback(
    ({ item }: RenderCalendarItemProps) => (
      <CalendarDayItem
        isSelected={selectedDate.fullLongDate === item.fullLongDate}
        isToday={isToday(item.defaultDateFormat)}
        date={item}
        onPress={() => handleSelectDate(item)}
      />
    ),
    [selectedDate]
  );

  const renderSeparator = () => <Divider />;

  useEffect(() => {
    if (dailyCalendar.length > 0) {
      const findedTodayIndexOnCalendar = dailyCalendar.findIndex(item =>
        isToday(item.defaultDateFormat)
      );

      if (findedTodayIndexOnCalendar !== -1) {
        setSelectedDate(dailyCalendar[findedTodayIndexOnCalendar]);
        setTodayIndexOnDailyCalendar(
          findedTodayIndexOnCalendar - 3 >= 0 ? findedTodayIndexOnCalendar - 3 : 0
        );
      }
    }
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
        initialScrollIndex={todayIndexOnDailyCalendar}
        bounces={false}
        bouncesZoom={false}
      />
    </Container>
  );
}
