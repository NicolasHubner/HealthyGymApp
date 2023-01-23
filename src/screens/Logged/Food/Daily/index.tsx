import React from 'react';
import { CalendarDayItem } from '@/components/molecules/CalendarDayItem';
import { Container } from './styles';

export function Daily() {
  return (
    <Container>
      <CalendarDayItem />
      <CalendarDayItem />
      <CalendarDayItem />
      <CalendarDayItem />
    </Container>
  );
}
