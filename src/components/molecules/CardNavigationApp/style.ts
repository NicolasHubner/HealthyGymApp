import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

interface CardsProps {
  size: number;
}

export const CardContainer = styled.TouchableOpacity<CardsProps>`
  flex-direction: column;
  align-items: center;
  margin-top: ${({ size }) => size}px;
`;

interface CardsProps {
  size: number;
  bgColor?: string;
}

export const Cards = styled.View<CardsProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ theme, bgColor }) => bgColor || theme.colors.green[500]};
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

interface ImageProps {
  size: number;
}

export const ImageLogo = styled.Image<ImageProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
