import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const Title = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${18}px;
    text-align: left;
`;
