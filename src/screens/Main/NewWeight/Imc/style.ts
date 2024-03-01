import { baseMediumText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const ContainerIMC = styled.View`
    width: 100%;
    height: 110px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 16px;
    align-self: center;
    margin-top: 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin-bottom: 8px;
`;

interface ContainerIMCLeftProps {
    color: string;
}

export const ContainerIMCLeft = styled.View<ContainerIMCLeftProps>`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-vertical: 12px;
    height: 70px;
    width: 54px;
    border-radius: 8px;
    background-color: ${({ color }) => color};
`;

export const IMCText = styled.Text`
    ${baseRegularText};
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

export const IMCNumber = styled(IMCText)`
    ${baseMediumText};
    color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
    letter-spacing: 0;
`;

export const ContainerIMCRight = styled.Text`
    ${baseRegularText};
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    width: 80%;
`;
export const GoalsDescription = styled.Text`
    ${baseRegularText};
    color: ${({ theme }) => theme.colors.gray[500]};
    font-size: 12px;
    /* line-height: 24px; */
    text-align: left;
    width: 100%;
    align-self: center;
    margin-bottom: 24px;
`;
