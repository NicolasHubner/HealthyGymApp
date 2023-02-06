import { baseMediumText } from '@/styles/global';
import styled from 'styled-components/native';

interface CalendarDayItemProps {
  isSelected: boolean;
}

export const Wrapper = styled.View`
  align-items: center;
  justify-content: center;

  padding: 16px 0 48px;
`;

export const Container = styled.View<CalendarDayItemProps>`
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 77px;

  border-radius: 100px;
  overflow: visible;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.green[700] : 'transparent'};
`;

export const Label = styled.Text<CalendarDayItemProps>`
  ${baseMediumText}
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.text)};
`;

export const DayWrapper = styled.View<CalendarDayItemProps>`
  background-color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : 'transparent')};
  margin-top: 8px;
  padding: 8px;
  border-radius: 500px;
`;

export const Day = styled.Text<CalendarDayItemProps>`
  ${baseMediumText}
  font-size: 14px;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.green[700] : theme.colors.white)};
`;

export const TodayMarkWrapper = styled.View`
  flex: 1;

  position: absolute;
  bottom: 38px;
  left: 0;
  right: 0;

  align-items: center;
  justify-content: center;
`;

export const TodayMark = styled.View`
  width: 6px;
  height: 6px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 100px;
`;
