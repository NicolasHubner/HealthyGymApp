import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { format, isToday } from 'date-fns';

import { CalendarDayItem } from '@/components/molecules/CalendarDayItem';
import { DateRangeProps, useCalendar } from '@/hooks/useCalendar';

import { Container, Divider } from './styles';
import { Text, View } from 'native-base';
import { ptBR } from 'date-fns/locale';

interface RenderCalendarItemProps {
    item: DateRangeProps;
}

interface DailyCalendarProps {
    yearLimit?: number;
    setDateForParent?: (date: Date) => void;
}

export function DailyCalendar({ setDateForParent }: DailyCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<DateRangeProps>({} as DateRangeProps);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dailyCalendar: DateRangeProps[] = useMemo(() => useCalendar(), []);
    const flatListRef = useRef<FlatList>(null);

    const scrollCalendarDayToToday = (findedTodayIndexOnCalendar: number) => {
        if (flatListRef && flatListRef.current) {
            const numberOfDaysBeforeToday = 2;
            const indexToScroll = findedTodayIndexOnCalendar - numberOfDaysBeforeToday;

            flatListRef.current?.scrollToIndex({
                index: indexToScroll >= 0 ? indexToScroll : 0,
                animated: true,
            });
        }
    };

    const getItemLayout = (__: any, index: number) => {
        const itemWidth = 50 + 16;
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

    const handleSelectDate = useCallback((date: DateRangeProps) => {
        setSelectedDate(date);
    }, []);

    const renderSeparator = () => <Divider />;

    const renderItem = useCallback(
        ({ item }: RenderCalendarItemProps) => {
            if (item.day === 1) {
                return (
                    <View flexDir="row" style={{ gap: 8 }}>
                        <View
                            borderLeftWidth="1"
                            bg="green.700"
                            borderRightWidth="1"
                            padding="16px 0 48px"
                            alignItems="center"
                            justifyContent="center">
                            <Text textTransform="capitalize" fontWeight="bold" color="white">
                                {format(new Date(item.defaultDateFormat), 'MMM', { locale: ptBR })}
                            </Text>
                            <Text textTransform="capitalize" fontWeight="bold" color="white">
                                {format(new Date(item.defaultDateFormat), 'yyyy', { locale: ptBR })}
                            </Text>
                        </View>
                        <CalendarDayItem
                            isSelected={selectedDate.fullLongDate === item.fullLongDate}
                            isToday={isToday(item.defaultDateFormat)}
                            date={item}
                            onPress={() => handleSelectDate(item)}
                        />
                    </View>
                );
            }

            return (
                <CalendarDayItem
                    isSelected={selectedDate.fullLongDate === item.fullLongDate}
                    isToday={isToday(item.defaultDateFormat)}
                    date={item}
                    onPress={() => handleSelectDate(item)}
                />
            );
        },
        [selectedDate, handleSelectDate]
    );

    useEffect(() => {
        if (dailyCalendar.length > 0) {
            const findedTodayIndexOnCalendar = dailyCalendar.length - 1;
            setSelectedDate(dailyCalendar[findedTodayIndexOnCalendar]);
            setTimeout(() => {
                scrollCalendarDayToToday(dailyCalendar.length - 1);
            }, 500);
        }
    }, [dailyCalendar]);

    useEffect(() => {
        if (Object.keys(selectedDate).length > 0) {
            setDateForParent?.(selectedDate.defaultDateFormat);
        }
    }, [selectedDate, setDateForParent]);

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
                maxToRenderPerBatch={32}
                initialNumToRender={32}
                updateCellsBatchingPeriod={500}
                getItemLayout={getItemLayout}
                onScrollToIndexFailed={() => {
                    scrollCalendarDayToToday(dailyCalendar.length - 1);
                }}
            />
        </Container>
    );
}
