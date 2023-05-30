import { baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const CardContainer = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    width: 33%;
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
    font-size: ${scale(14)}px;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    line-height: ${verticalScale(15)}px;
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
