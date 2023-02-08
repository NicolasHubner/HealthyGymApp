import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const flatListRef = useRef<FlatList>(null);

  const scrollCalendarDayToToday = (findedTodayIndexOnCalendar: number) => {
    if (flatListRef && flatListRef.current) {
      const numberOfDaysBeforeToday = 2;
      const indexToScroll = findedTodayIndexOnCalendar - numberOfDaysBeforeToday;

      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: indexToScroll >= 0 ? indexToScroll : 0,
          animated: true,
        });
      }, 1000);
    }
  };

  const getItemLayout = (__: any, index: number) => {
    const itemWidth = 50;
    const itemSeparatorWidth = 8;
    const itemTotalSize = itemWidth + itemSeparatorWidth;

    return {
      // This length represents the total item size (width + separator width)
      length: itemTotalSize,
      // Offset is the width (length) of item * index that you want to scroll to
      offset: itemTotalSize * index,
      index,
    };
  };

  const setCorrectDatesIndexToStates = () => {
    if (dailyCalendar.length <= 0) return;

    const findedTodayIndexOnCalendar = dailyCalendar.findIndex(item =>
      isToday(item.defaultDateFormat)
    );

    if (findedTodayIndexOnCalendar === -1) {
      setSelectedDate(dailyCalendar[0]);
      return;
    }

    setSelectedDate(dailyCalendar[findedTodayIndexOnCalendar]);

    scrollCalendarDayToToday(findedTodayIndexOnCalendar);
  };

  const handleSelectDate = useCallback((date: DateRangeProps) => {
    setSelectedDate(date);
  }, []);

  const renderSeparator = () => <Divider />;

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

  useEffect(() => {
    if (flatListRef && flatListRef?.current) {
      setCorrectDatesIndexToStates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flatListRef]);

  return (
    <Container>
      <FlatList
        horizontal
        ref={flatListRef}
        data={dailyCalendar}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderSeparator}
        ListFooterComponent={renderSeparator}
        keyExtractor={item => item.fullLongDate}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={16}
        initialNumToRender={16}
        updateCellsBatchingPeriod={1000}
        getItemLayout={getItemLayout}
      />
    </Container>
  );
}
