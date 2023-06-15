import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;

    padding-top: 72px;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;
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
