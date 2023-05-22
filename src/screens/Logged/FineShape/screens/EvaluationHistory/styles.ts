import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
`;

export const SearchUserInput = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.colors.gray[500],
}))`
    ${baseBoldText}
    letter-spacing: 1px;
    font-size: ${scale(12)}px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    padding: 12px;
`;
