import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

interface ContainerProps {
    selected?: boolean;
}

export const Container = styled.View<ContainerProps>`
    flex-direction: row;
    gap: 12px;

    width: 100%;
    height: auto;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.green[700]};
    border-width: ${({ selected }) => (selected ? '2px' : '0px')};
    background-color: ${({ selected }) => (selected ? 'rgba(56, 84, 57, 0.05) ' : '#f2f2f2')};
    padding: 8px;
    border-radius: 8px;
`;

export const DateContainer = styled.View`
    border: 1px solid ${({ theme }) => theme.colors.green[700]};
    border-radius: 4px;
    align-items: center;
    justify-content: center;

    padding: 4px 12px;
`;

export const DateDay = styled.Text`
    ${baseBoldText}
    font-size: ${22}px;
    color: ${({ theme }) => theme.colors.green[700]};
`;

export const DateMonth = styled.Text`
    ${baseRegularText}
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.green[700]};
    text-transform: uppercase;
`;

export const UserName = styled.Text`
    ${baseBoldText}
    letter-spacing: 1px;
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.gray[700]};
`;

export const UserEmail = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[700]};
`;

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
