import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';
import { scale, verticalScale } from 'react-native-size-matters';

export const ContainerCards = styled.View`
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 16px;
    padding-horizontal: 8px;
    width: 100%;
`;

interface CardProps {
    color: string;
}

export const Cards = styled.TouchableOpacity<CardProps>`
    width: 48%;
    height: ${scale(200)}px;
    background-color: ${({ color }) => color};
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 16px;
    elevation: 5;
    shadow-color: black;
    shadow-radius: 10px;
    shadow-opacity: 0.2;
    padding-top: 24px;
    padding-left: 20px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const CardAttTime = styled.Text`
    ${baseRegularText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;
    /* margin-left: 8px; */
`;

export const Graphics = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: ${verticalScale(24)}px;
`;

export const ImageGraphics = styled.Image`
    width: ${scale(40)}px;
    height: ${scale(60)}px;
    margin-top: 16px;
`;

export const Container = styled.View``;

export const AttView = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    flex-grow: 1;
`;

export const CardTitle = styled.Text`
    ${baseRegularText}
    font-size: ${scale(12)}px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: ${({ theme }) => theme.colors.white};
`;

export const CardTitleAtts = styled.Text`
    ${baseRegularText}
    font-size: ${scale(24)}px;
    line-height: ${scale(24)}px;
    color: ${({ theme }) => theme.colors.white};
`;

export const CardTitleAttsUnit = styled.Text`
    ${baseRegularText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.white};
    margin-left: 8px;
`;
