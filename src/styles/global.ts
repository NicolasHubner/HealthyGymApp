import { css } from 'styled-components/native';

export const baseRegularText = css`
    font-family: ${({ theme }) => theme.font_family.regular};
    font-size: 16px;

    color: ${({ theme }) => theme.colors.text};
`;

export const baseBoldText = css`
    font-family: ${({ theme }) => theme.font_family.bold};
    font-size: 16px;
    font-weight: bold;

    color: ${({ theme }) => theme.colors.text};
`;
