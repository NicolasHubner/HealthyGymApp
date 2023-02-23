import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

import { Entypo } from '@expo/vector-icons';
import { Switch } from 'react-native-gesture-handler';

export const BackArrow = styled(Entypo).attrs(({ theme }) => ({
    name: 'chevron-down',
    size: 32,
    color: theme.colors.black,
}))``;

export const SleepImage = styled.Image`
    align-self: center;
    width: 143px;
    height: 88px;
`;

export const PageTitleContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const PageTitle = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${scale(20)}px;
    margin-top: 42px;
    text-align: center;
`;

export const PageSubtitle = styled.Text`
    ${baseRegularText}
    font-size: ${scale(14)}px;
    text-align: center;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    text-align: center;

    margin-top: 12px;
`;

export const AddAlarmContainer = styled.View`
    background-color: #f4f6fa;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    height: 66px;

    margin: 16px 0 0;
`;

export const AddAlarmText = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${scale(14)}px;
    margin-right: 8px;
`;

export const AlarmSwitch = styled(Switch).attrs(({ theme }) => ({
    trackColor: { false: '#767577', true: theme.colors.green[500] },
    ios_backgroundColor: '#3e3e3e',
}))`
    margin-left: 8px;
`;

export const ButtonContainer = styled.View`
    margin: 30px 0 40px;
    align-items: center;
    justify-content: center;
`;
