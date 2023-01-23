import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const CardContainer = styled.TouchableOpacity`
  flex-direction: column;
  width: 33%;
  align-items: center;
  margin-top: 16px;
`;
interface CardsProps {
  size: number;
}

export const Cards = styled.View<CardsProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ theme }) => theme.colors.green[500]};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
export const CardTitle = styled.Text`
  ${baseRegularText}
  font-size: 14px;
  color: ${({ theme }) => theme.colors.blue_metal[500]};
  line-height: 14px;
  margin-top: 12px;
  text-align: center;
`;
