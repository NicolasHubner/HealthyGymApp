import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Label = styled.Text`
  ${baseRegularText}
  font-size: 12px;
`;

export const Day = styled.Text`
  ${baseRegularText}
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;
