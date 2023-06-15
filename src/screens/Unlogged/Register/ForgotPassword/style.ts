import { Button } from '@/components/atoms/Button';
import { baseRegularText } from '@/styles/global';
import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 20px 0 0;
`;
export const ButtonIsNotMyEmail = styled(ButtonContainer)`
    margin: 14px;
`;

export const ButtonNotMyEmail = styled(Button)`
    background-color: red;
`;

export const FakeInputContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 16px 0 0px;
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
