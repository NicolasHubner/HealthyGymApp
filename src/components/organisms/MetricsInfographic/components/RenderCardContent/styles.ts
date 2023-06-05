import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { baseRegularText } from '@/styles/global';

export const AttView = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
    flex-grow: 1;
`;

export const CardTitle = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: ${({ theme }) => theme.colors.white};
`;

export const CardTitleAtts = styled.Text`
    ${baseRegularText}
    font-size: ${22}px;
    line-height: ${22}px;
    color: ${({ theme }) => theme.colors.white};
`;

export const CardTitleAttsUnit = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.white};
    margin-left: 8px;
`;
