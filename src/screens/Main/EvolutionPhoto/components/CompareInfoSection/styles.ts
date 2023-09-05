import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View`
    gap: 12px;
`;

export const Wrapper = styled.View`
    gap: 4px;
    padding: 0px 0px 24px;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${16}px;
`;

export const Property = styled.Text`
    ${baseBoldText}
    font-size: ${14}px;
`;

export const Value = styled.Text``;

export const Content = styled.View`
    flex-direction: row;
    align-items: center;

    gap: 12px;
`;

export const Button = styled.View`
    background-color: ${({ theme }) => theme.colors.green[700]};
    border-radius: 12px;
    align-items: center;
    justify-content: center;

    margin-left: auto;
    padding: 4px 12px;
`;

export const ButtonText = styled.Text`
    ${baseBoldText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.white};
`;
