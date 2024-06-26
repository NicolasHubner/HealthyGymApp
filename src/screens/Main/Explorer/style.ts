import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { Platform } from 'react-native';

export const ContainerTitle = styled.View`
    width: 100%;
    text-align: left;
    margin-top: ${Platform.OS === 'ios' ? 100 : 70}px;
    margin-bottom: 20px;
    margin-left: 28px;
`;
export const InputContainer = styled.View`
    flex-direction: row;
    width: 90%;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 14px 20px;
    border-radius: 16px;
    margin-left: 28px;
    margin-right: 28px;
`;

export const Input = styled(TextInput)`
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    padding-left: 12px;
`;
export const InputSearchIcon = styled(AntDesign).attrs(({ theme }) => ({
    color: theme.colors.blue_metal[700],
    size: 16,
    name: 'search1',
}))``;
