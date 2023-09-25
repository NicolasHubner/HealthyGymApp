import { scale, verticalScale } from 'react-native-size-matters';
import { baseMediumText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: ${verticalScale(40)}px;
    margin-bottom: ${verticalScale(80)}px;
    width: ${scale(270)}px;
    background-color: ${({ theme }) => theme.colors.green[700]};
    border-radius: 16px;
    padding-vertical: ${14}px;
`;

export const ButtonText = styled.Text`
    ${baseMediumText}
    color: #fff;
    font-size: ${16}px;
    margin-left: 16px;
`;
