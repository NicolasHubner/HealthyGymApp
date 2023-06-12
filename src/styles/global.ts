import { css } from 'styled-components/native';
import { lightTheme } from './theme';

const defaultColor = lightTheme?.colors?.text ?? '#fefefe';
const defaultLetterSpacing = '0.2px';
const defaultFontSize = '16px';

const baseText = css`
    color: ${defaultColor};
    font-size: ${defaultFontSize};
    letter-spacing: ${defaultLetterSpacing};
`;

export const baseRegularText = css`
    ${baseText}
    font-family: ${({ theme }) => theme?.font_family?.regular ?? 'Rubik_400Regular'};
`;

export const baseMediumText = css`
    ${baseText}
    font-weight: medium;
    font-family: ${({ theme }) => theme?.font_family?.medium ?? 'Rubik_500Medium'};
`;

export const baseBoldText = css`
    ${baseText}
    font-weight: bold;
    font-family: ${({ theme }) => theme?.font_family?.bold ?? 'Rubik_700Bold'};
`;
