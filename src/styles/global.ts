import { scale } from 'react-native-size-matters';
import { css } from 'styled-components/native';

export const baseRegularText = css`
    font-family: ${({ theme }) => theme.font_family.regular};
    font-size: ${scale(16)}px;
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.colors.text};
`;

export const baseMediumText = css`
    font-family: ${({ theme }) => theme.font_family.medium};
    font-size: ${scale(16)}px;
    font-weight: medium;
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.colors.text};
`;

export const baseBoldText = css`
    font-family: ${({ theme }) => theme.font_family.bold};
    font-size: ${scale(16)}px;
    font-weight: bold;
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.colors.text};
`;
