import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { baseBoldText } from '@/styles/global';

export const Container = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const HomeTitleContainer = styled.View`
    flex-direction: column;
    width: 80%;
    justify-content: flex-start;
    margin-top: 32px;
    margin-left: 8px;
`;

export const ProfileContainer = styled(TouchableOpacity)``;

export const ProfileLogo = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 16px;
    margin-top: 16px;
    margin-right: 28px;
`;

export const CircleProfileLogo = styled.View`
    width: 16px;
    height: 16px;
    border-radius: 12px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.green[700]};
    position: absolute;
    bottom: 24px;
    left: -2px;
`;

export const DateText = styled.Text`
    ${baseBoldText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.green[700]};
    letter-spacing: 2px;
`;

export const WelcomeText = styled.Text`
    ${baseBoldText}
    font-size: ${20}px;
    width: 90%;
    color: ${({ theme }) => theme.colors.black};
`;
