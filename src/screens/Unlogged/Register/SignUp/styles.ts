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
