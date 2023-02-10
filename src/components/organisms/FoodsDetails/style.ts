import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ImageTop = styled.Image`
    width: 100%;
    height: 400px;
`;
export const ViewTips = styled.View`
    justify-content: center;
    align-items: center;
    width: 137px;
    height: 33px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.green[500]};
    position: absolute;
    top: 256px;
    right: 16px;
`;
export const TextTips = styled.Text`
    ${baseBoldText}
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
    letter-spacing: 2px;
    text-transform: uppercase;
`;

export const ViewContainer = styled.View`
    flex: 1;
    width: 100%;
    padding-horizontal: 28px;
    padding-top: 40px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: -100px;
`;
export const ViewTitle = styled.View`
    width: 100%;
    justify-content: flex-start;
`;
export const TextTitle = styled.Text`
    ${baseBoldText}
    font-size: 12px;
    color: ${({ theme }) => theme.colors.green[700]};
    letter-spacing: 2px;
    text-transform: uppercase;
`;
export const NameFood = styled.Text`
    ${baseBoldText}
    font-size: 28px;
    letter-spacing: -0.9px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
export const ViewKcalAndTime = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 24px;
`;
export const ViewKcal = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const TextKcal = styled.Text`
    ${baseBoldText}
    font-size: 32px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
export const TextKcalUnit = styled.Text`
    ${baseRegularText};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    margin-left: 8px;
`;
export const IconFire = styled(MaterialCommunityIcons)`
    color: ${({ theme }) => theme.colors.green[700]};
`;

export const TextTime = styled.Text`
    ${baseRegularText}
    font-size: 16px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
