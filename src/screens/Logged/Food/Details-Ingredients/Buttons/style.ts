import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    margin-bottom: 64px;
`;
export const ButtonAdd = styled.View`
    width: ${scale(270)}px;
    height: 56px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.background};
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.colors.green[700]};
`;

export const ButtonAddGreen = styled.View`
    width: ${scale(270)}px;
    height: 56px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.green[700]};
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

interface ButtonAddTextProps {
    color?: string;
}

export const ButtonAddText = styled.Text<ButtonAddTextProps>`
    ${baseBoldText}
    font-size: ${scale(16)}px;
    color: ${({ color, theme }) => color || theme.colors.green[700]};
`;
