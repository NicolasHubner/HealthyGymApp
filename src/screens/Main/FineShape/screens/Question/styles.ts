import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;

    padding-top: 56px;
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

export const ErrorMessage = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.red[500]};
    font-size: ${12}px;
    margin-top: 8px;
`;

export const InsightsButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.green[300]};
    padding: 8px 12px;
    border-radius: 12px;
    align-self: flex-end;
`;

export const InsightsText = styled.Text`
    ${baseMediumText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.green[700]};
`;
