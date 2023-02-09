import { TextInput } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';

export const Container = styled.ScrollView`
    flex: 1;
`;

export const Content = styled.View`
    background-color: ${({ theme }) => theme.colors.gray[100]};
    flex: 1;

    margin-top: -24px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    padding: 24px;
`;

export const InputContainer = styled.View`
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 14px 20px;
    border-radius: 16px;
`;

export const InputSearchIcon = styled(AntDesign).attrs(({ theme }) => ({
    color: theme.colors.blue_metal[700],
    size: 16,
    name: 'search1',
}))``;

export const Input = styled(TextInput)`
    color: ${({ theme }) => theme.colors.blue_metal[700]};

    padding-left: 12px;
`;
