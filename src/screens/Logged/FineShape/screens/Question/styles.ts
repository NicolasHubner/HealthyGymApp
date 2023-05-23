import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;

    padding-top: 56px;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.colors.gray[500],
}))`
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.colors.gray[500]};
    border-style: solid;

    ${baseBoldText}
    letter-spacing: 1px;

    padding-bottom: 12px;
`;

export const ErrorMessage = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.red[500]};
    font-size: ${scale(12)}px;
    margin-top: 8px;
`;
