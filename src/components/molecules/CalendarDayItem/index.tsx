import { Container, Day, DayWrapper, Label } from './styles';

interface CalendarDayItemProps {
  isSelected: boolean;
}

export function CalendarDayItem({ isSelected }: CalendarDayItemProps) {
  return (
    <>
      <Container isSelected={isSelected}>
        <Label isSelected={isSelected}>Dom</Label>
        <DayWrapper isSelected={isSelected}>
          <Day isSelected={isSelected}>10</Day>
        </DayWrapper>
      </Container>
    </>
  );
}
