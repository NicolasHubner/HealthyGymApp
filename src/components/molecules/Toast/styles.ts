import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;

    width: 90%;
    height: auto;
    min-height: 60px;

    background-color: ${({ theme }) => theme.colors.white};
    overflow: hidden;

    padding: 6px 8px;
    border-radius: 4px;
    border: 0px solid ${({ theme }) => theme.colors.gray[300]};
    border-bottom-width: 1px;
    border-right-width: 1px;
`;

interface VerticalBarProps {
    type: 'success' | 'error' | 'warning';
}

export const VerticalBar = styled.View<VerticalBarProps>`
    width: 4px;
    height: 100%;
    background-color: ${({ theme, type }) =>
        type === 'success'
            ? theme.colors.green[500]
            : type === 'error'
            ? theme.colors.red[500]
            : theme.colors.blue[300]};
    border-radius: 4px;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${14}px;
`;

export const Text = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[500]};
`;
