import { baseBoldText, baseRegularText } from '@/styles/global';
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
    padding-bottom: 12px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    padding: 12px;
`;

interface UserCardProps {
    selected?: boolean;
}

export const UserCard = styled.View<UserCardProps>`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    gap: 6px;
    padding: 12px 16px;
    border: 2px solid
        ${({ theme, selected }) => (selected ? theme.colors.green[700] : theme.colors.white)};
`;

export const UserName = styled.Text`
    ${baseBoldText}
    letter-spacing: 1px;
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.text};
`;

export const UserEmail = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.text};
`;
