import { baseMediumText } from '@/styles/global';
import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ContainerGreenTop = styled.View`
    background-color: ${({ theme }) => theme.colors.green[500]};
    height: 212px;
    width: 100%;
`;

export const TitleWeight = styled.Text`
    ${baseMediumText};
    color: ${({ theme }) => theme.colors.white};
    font-size: 20px;
    margin-top: 16px;
    width: 100%;
    text-align: center;
    margin-top: ${verticalScale(56)}px;
`;

export const ContainerWeigth = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    width: 80%;
    /* background-color: red; */
    align-self: center;
`;

export const WeightContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    width: 80px;
    /* background-color: red; */
`;

export const WeightText = styled.Text`
    ${baseMediumText};
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    font-size: 12px;
`;

export const WeightValue = styled.Text`
    ${baseMediumText};
    color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
`;
