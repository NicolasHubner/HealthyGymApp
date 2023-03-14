import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
    align-self: flex-start;
    margin-top: 52px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
