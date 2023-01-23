import React from 'react';
import { CalendarDayItem } from '@/components/molecules/CalendarDayItem';
import { Container, Divider } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { useCalendar } from '@/hooks/useCalendar';

const DATA = [0, 1, 2, 3, 4, 5, 6];

export function Daily() {
  const renderItem = ({ item }: any) => <CalendarDayItem isSelected={item === 3} />;

  const renderSeparator = () => <Divider />;

  console.log(useCalendar(2023));

  return (
    <Container>
      <FlatList
        horizontal
        data={DATA}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </Container>
  );
}
