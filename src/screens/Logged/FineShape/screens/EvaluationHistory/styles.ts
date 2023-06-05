import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;
`;

export const SearchUserInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.colors.gray[500],
}))`
    ${baseBoldText}
    letter-spacing: 1px;
    font-size: ${12}px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    padding: 12px;
`;

export const PageHeader = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};
    align-items: flex-end;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    padding: 40px 20px 12px;
`;

export const PageHeaderTitle = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
    margin: 0 auto;
`;
