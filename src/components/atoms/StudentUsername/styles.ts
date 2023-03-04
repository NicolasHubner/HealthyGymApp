import { baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    gap: 6px;

    align-items: center;
`;

export const Username = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${scale(10)}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;
