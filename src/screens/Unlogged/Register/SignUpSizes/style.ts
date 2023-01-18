import { TextInputMask } from 'react-native-masked-input';
import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';
import RNPickerSelect from 'react-native-picker-select';

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

export const InputBirthday = styled(TextInputMask)`
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

export const InputDropDown = styled(RNPickerSelect).attrs({
    placeholderTextColor: '#B7B7CC',
    selectionColor: '#B7B7CC',
})`
    width: 90%;
    height: 48px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    /* padding: 0 16px; */
    z-index: -1;
    padding-left: 45px;
    border: 0;
    margin: 0 auto;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.blue_metal[300]};
`;
export const InputWeightAndHeight = styled(Inputs)`
    width: 80%;
    margin: 0;
`;

export const InputContainerWeightAndHeight = styled.View`
    width: 90%;
    flex-direction: row;
    margin-top: 16px;
    /* justify-content: flex-start; */
    align-items: center;
`;

export const ContainerKGandM = styled.View`
    width: 51px;
    margin-left: 10px;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.green[500]};
    height: 48px;
    border-radius: 8px;
`;

export const TextKGandM = styled.Text`
    ${baseRegularText}
    font-size: 12px;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    letter-spacing: 1px;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 60px 0 0;
`;
