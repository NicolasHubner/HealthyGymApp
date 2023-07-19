import { baseBoldText, baseRegularText } from './../../../styles/global';
import styled from 'styled-components/native';
import { Input } from 'native-base';
import { Pressable } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

export const TitleContainer = styled.View`
    width: 100%;
    justify-content: flex-start;
    margin-bottom: 24px;
    flex-direction: row;
    align-items: center;
    border: 0px solid ${({ theme }) => theme.colors.gray[300]};
    padding-bottom: 12px;
    border-bottom-width: 1px;
`;

export const TitleScreen = styled.Text`
    ${baseBoldText}
    font-size: ${22}px;
    color: ${({ theme }) => theme.colors.black};
`;
export const SubTitleContainer = styled.View`
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
`;
export const SubTitle = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;
    color: ${({ theme }) => theme.colors.black};
    letter-spacing: 0.3px;
`;
export const IconNumberNotification = styled.View`
    width: 40px;
    height: 32px;
    border-radius: 24px;
    background-color: ${({ theme }) => theme.colors.green[500]};
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`;
export const IconText = styled.Text`
    ${baseRegularText}
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.black};
    letter-spacing: 0.3px;
    text-align: center;
`;
export const ContainerNotification = styled.View`
    width: 95%;
    flex-direction: column;
    margin-bottom: 32px;
`;
export const NotifcationCard = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    margin-top: ${verticalScale(8)}px;
`;
export const CardTextContainer = styled.View`
    width: 80%;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
`;
export const CardTitle = styled.Text`
    ${baseBoldText}
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 0.3px;
`;
export const CardSubTitle = styled.Text`
    ${baseRegularText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    letter-spacing: 0.17px;
`;

export const RemoveAccountContainer = styled.View`
    margin-top: auto;
    margin-bottom: 40px;
    margin-right: auto;
    border: 0px solid ${({ theme }) => theme.colors.gray[300]};
    border-top-width: 1px;

    width: 100%;
    padding-top: 24px;
`;

export const RemoveAccountTitle = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.red[500]};
    font-size: 14px;
    text-decoration: underline;
    text-align: center;
`;

export const ConfirmTextMessage = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    margin-bottom: 8px;
`;

export const ConfirmInput = styled(Input)`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    text-decoration: none;
`;

export const ConfirmButton = styled(Pressable)`
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 8px 0;
    margin-top: 16px;
    background-color: ${({ theme, disabled }) =>
        disabled ? theme.colors.gray[500] : theme.colors.green[700]};
`;

export const ConfirmButtonText = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
    font-size: 14px;
`;
