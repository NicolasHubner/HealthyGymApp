import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${scale(13)}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const TextArea = styled.TextInput`
    ${baseRegularText}
    font-size: ${scale(12)}px;
    background-color: ${({ theme }) => theme.colors.beige};
    border-radius: 14px;
    color: ${({ theme }) => theme.colors.black};

    width: 100%;
    margin-top: 10px;

    padding: 10px;
    min-height: 130px;
`;

export const CaracterCounter = styled.Text`
    ${baseRegularText}
    font-size: ${scale(10)}px;
    color: ${({ theme }) => theme.colors.gray[600]};
    text-align: right;
    margin-top: 10px;
`;
