import { baseMediumText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

export const Box = styled.View`
    background: ${({ theme }) => theme.colors.white};

    padding: 20px;
    border-radius: 20px;

    margin: 16px 0 0;
    ma
`;

export const BoxContent = styled.View``;

export const BoxHeaderWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* width: 100%; */
`;

export const BoxHeader = styled.View``;

export const BoxTitleContent = styled.View`
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;

    margin: 14px 0 0;
`;

export const BoxTitle = styled.Text`
    ${baseMediumText}
    font-size: ${12}px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.green[700]};
    letter-spacing: 2px;
`;

export const FlameIcon = styled(Ionicons).attrs(({ theme }) => ({
    name: 'flame',
    size: 20,
    color: theme.colors.green[500],
}))`
    padding: 0 0 3px;
    margin-right: 12px;
`;

export const BoxKcal = styled.Text`
    ${baseMediumText}
    font-size: ${22}px;
`;

export const BoxKcalText = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    line-height: 20px;

    color: ${({ theme }) => theme.colors.blue_metal[500]};

    margin-left: 4px;
`;

export const BoxButtonPlus = styled.View`
    background-color: ${({ theme }) => theme.colors.green[300]};
    border-radius: 12px;

    height: 36px;
    width: 36px;

    align-items: center;
    justify-content: center;
`;

export const PlusIcon = styled(AntDesign).attrs(({ theme }) => ({
    name: 'plus',
    size: 24,
    color: theme.colors.green[700],
}))``;

export const Divider = styled.View`
    height: 1px;
    width: 100%;

    background-color: ${({ theme }) => theme.colors.gray[100]};

    margin: 14px 0 16px;
`;

export const BoxCardCarboIndicator = styled.View``;

export const BoxCardFooter = styled.View``;

export const BoxCardFooterText = styled.Text.attrs({
    numberOfLines: 2,
})`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    font-size: ${14}px;

    line-height: 24px;
`;

export const BoxCardFooterLink = styled.Text`
    ${baseMediumText}
    color: ${({ theme }) => theme.colors.green[700]};
    font-size: ${14}px;
    margin-top: 8px;
`;
