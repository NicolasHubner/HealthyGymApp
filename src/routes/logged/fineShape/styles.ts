import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const PageHeader = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 16px 20px;
`;

export const PageHeaderTitle = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
    margin: 0 auto;
`;
