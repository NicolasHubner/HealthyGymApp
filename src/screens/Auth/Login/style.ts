import { baseRegularText, baseBoldText } from '@/styles/global';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const SubtitleContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin-top: -10px;
`;

export const Subtitle = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.black};
`;

export const SubtitleContainerWelcome = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 6px;
    margin-bottom: 20px;
`;

export const SubtitleWelcome = styled.Text`
    ${baseBoldText}
    font-size: ${18}px;
    color: ${({ theme }) => theme.colors.green[700]};
    line-height: 30px;
`;

export const InputContainer = styled.View`
    width: 100%;
    margin-top: 16px;
    justify-content: center;
`;
export const Inputs = styled(TextInput).attrs({
    placeholderTextColor: '#B7B7CC',
    selectionColor: '#B7B7CC',
})`
    ${baseRegularText}
    width: 90%;
    height: 48px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    padding: 0 16px;
    padding-left: 45px;
    margin: 0 auto;
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.blue_metal[300]};
`;

export const ForgotPasswordContainer = styled.Pressable`
    /* margin: 0 auto; */
    width: 90%;
    margin-top: 10px;
`;

export const ForgotPassword = styled.Text`
    ${baseRegularText}
    text-align: center;
    text-decoration: underline;
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.black};
`;

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 60px 0 0;
`;
