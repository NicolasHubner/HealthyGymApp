import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    gap: 6px;
    width: 80%;

    align-items: center;
`;

export const Username = styled.Text`
    ${baseRegularText}
    letter-spacing: 1px;
    font-size: ${10}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;
