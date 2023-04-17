import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${scale(20)}px;
    align-self: flex-start;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;

export const EmptyListText = styled.Text`
    ${baseRegularText}
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;
