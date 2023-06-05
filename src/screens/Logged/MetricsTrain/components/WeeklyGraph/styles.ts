import { baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.green[500]};
    padding: 17px 0 48px;

    margin-top: 32px;
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
`;

export const WeekDaysContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 60%;
    align-self: center;
`;

interface WeekDayProps {
    selected?: boolean;
}

export const GraphOption = styled.View<WeekDayProps>`
    padding: 12px;
    border-radius: 16px;
    background-color: ${({ theme, selected }) =>
        !selected ? 'transparent' : theme.colors.green[700]};
`;

export const WeekDay = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    font-size: ${12}px;
    letter-spacing: 2px;
`;
