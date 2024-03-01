import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';
import ExpoCheckBox from 'expo-checkbox';
import { scale, verticalScale } from 'react-native-size-matters';

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

export const Checkbox = styled(ExpoCheckBox).attrs(({ theme, value: isChecked }) => ({
    color: isChecked ? theme.colors.green[700] : theme.colors.blue_metal[300],
}))`
    border-radius: 6px;
`;

export const ButtonCreateNewRegister = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.green[500]};
    border-radius: 100px;
    padding: 20px;
    align-items: center;
    justify-content: center;
    bottom: ${verticalScale(24)}px;
    position: absolute;
    right: ${scale(24)}px;
    z-index: 1;

    elevation: 4;
    shadow-color: black;
    shadow-radius: 10px;
    shadow-opacity: 0.2;
`;

export const InsightsButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.green[300]};
    padding: 12px 16px;
    border-radius: 16px;
    align-self: flex-end;
`;

export const InsightsText = styled.Text`
    ${baseMediumText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.green[700]};
`;
