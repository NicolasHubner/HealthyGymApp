import styled from 'styled-components/native';

import { baseBoldText } from '@/styles/global';

interface ContainerProps {
    isDisabled: boolean;
    fullWidth?: boolean;
    backgroundColor?: string;
}

export const Container = styled.View<ContainerProps>`
    background-color: ${({ theme, backgroundColor }) => backgroundColor ?? theme.colors.green[700]};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};

    border-radius: 16px;
    height: 56px;
    width: ${({ fullWidth = false }) => (fullWidth ? '100%' : '260px')};
    min-width: ${({ fullWidth = false }) => (fullWidth ? '100%' : '260px')};

    align-items: center;
    justify-content: center;
`;

export const ContainerButtonGreenLight = styled.View`
    background-color: #90d692;
    /* opacity: 0.7; */

    border-radius: 16px;
    height: 56px;
    width: 260px;

    align-items: center;
    justify-content: center;
`;

export const ButtonLabel = styled.Text`
    ${baseBoldText}
    width: 100%;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
`;
