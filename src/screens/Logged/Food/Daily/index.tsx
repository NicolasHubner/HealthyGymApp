import React from 'react';
import { CalendarDayItem } from '@/components/molecules/CalendarDayItem';
import { Container, Divider } from './styles';
import { FlatList } from 'react-native-gesture-handler';

const DATA = [0, 1, 2, 3, 4, 5, 6];

export function Daily() {
  const renderItem = ({ item }: any) => <CalendarDayItem isSelected={item === 3} />;

  const renderSeparator = () => <Divider />;

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
