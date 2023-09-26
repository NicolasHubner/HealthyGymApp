import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

interface ContainerProps {
    width: boolean;
}

export const CardContainer = styled.TouchableOpacity<ContainerProps>`
    flex-direction: column;
    align-items: center;
    width: ${({ width }) => (width ? '16%' : '33%')};
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
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    line-height: ${14}px;
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

export const NotifcationBadge = styled.Text`
    width: 20px;
    height: 20px;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.colors.red[500]};
    position: absolute;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
    font-weight: bold;
    top: -5px;
    right: -5px;
`;
