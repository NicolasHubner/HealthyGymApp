import styled from 'styled-components/native';
import { baseRegularText } from '@/styles/global';
import { TextInput } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';

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
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.blue_metal[300]};
`;
