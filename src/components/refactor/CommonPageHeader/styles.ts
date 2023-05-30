import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const PageHeader = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};
    align-items: flex-end;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height: 80px;
    padding: 0px 20px 12px;
    z-index: 20;
`;

export const PageHeaderTitle = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
    margin: 0 auto;
`;
