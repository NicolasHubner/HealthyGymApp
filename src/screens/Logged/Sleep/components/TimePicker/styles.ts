import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

import { Entypo } from '@expo/vector-icons';
import { Switch } from 'react-native-gesture-handler';
import OBPicker from '@ouroboros/react-native-picker';

export const BackArrow = styled(Entypo).attrs(({ theme }) => ({
    name: 'chevron-down',
    size: 32,
    color: theme.colors.black,
}))``;

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

export const ClockTimeContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    margin: 16px 0 0;
`;

export const Picker = styled(OBPicker)`
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${scale(14)}px;

    width: 80px;
    height: 70px;
`;

export const PickerSeparator = styled.Text`
    ${baseBoldText}
    font-size: ${scale(28)}px;
`;

export const AddAlarmContainer = styled.View`
    background-color: #f4f6fa;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    height: 66px;
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
}))``;

export const ButtonContainer = styled.View`
    margin-top: auto;
    margin-bottom: 40px;
    align-items: center;
    justify-content: center;
`;
