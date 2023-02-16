import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

export const PageTitleContainer = styled.View`
    align-items: center;
`;

export const PageTitle = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
    margin-top: 42px;
`;

export const PageSubtitle = styled.Text`
    ${baseRegularText}
    font-size: ${scale(14)}px;
    text-align: center;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
`;

export const DaysListTitle = styled.Text`
    ${baseRegularText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.green[700]};
    text-align: left;
    text-transform: uppercase;

    width: 100%;
    margin-top: 42px;
`;

export const DayList = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin-right: auto;
    margin-top: 16px;
`;

export const DayListColumn = styled.View``;

export const WeekDay = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

export const Checkbox = styled(BouncyCheckbox).attrs(({ theme }) => ({
    size: 20,
    unfillColor: theme.colors.green[300],
    fillColor: theme.colors.green[500],
    iconStyle: {
        borderRadius: 6,
        borderWidth: 0,
    },
    innerIconStyle: {
        borderRadius: 6,
        borderWidth: 0,
    },
    bounceVelocityIn: 4,
    bounceVelocityOut: 4,
}))`
    border-radius: 0;
`;

export const DayName = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${scale(14)}px;
    margin-left: 12px;
`;

export const ButtonContainer = styled.View`
    margin-top: 28px;
`;
