import styled from 'styled-components/native';

import { baseBoldText, baseRegularText } from '@/styles/global';

export const SubtitleContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin-top: 33px;
`;
export const Subtitle = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.black};
`;

export const SubtitleContainerCreate = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 31px;
`;

export const SubtitleCreate = styled.Text`
    ${baseBoldText}
    font-size: 20px;
    color: ${({ theme }) => theme.colors.green[700]};
    line-height: 30px;
`;

export const InputContainer = styled.View`
    width: 100%;
    margin-top: 16px;
    justify-content: center;
`;
export const Inputs = styled.TextInput.attrs({
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
    font-size: 12px;
    color: ${({ theme }) => theme.colors.blue_metal[300]};
`;

export const CheckBoxContainer = styled.View`
    margin: 0 auto;
    width: 90%;
    margin-top: 14px;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
`;

export const CheckBoxText = styled.Text`
    ${baseRegularText}
    font-size: 10px;
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-left: 8px;
    width: 70%;
    line-height: 15px;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 60px 0 0;
`;

export const LoginContainer = styled.View`
    align-items: center;
    justify-content: center;

    flex-direction: row;
    flex-wrap: wrap;

    margin: 24px 0 0;
`;

export const LoginText = styled.Text`
    ${baseRegularText}
    margin-right: 6px;
`;
