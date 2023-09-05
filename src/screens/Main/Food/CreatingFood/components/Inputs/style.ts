import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const InputCreateFood = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.colors.blue_metal[100],
    selectionColor: theme.colors.blue_metal[100],
}))`
    /* flex-grow: 1; */
    /* margin: 0; */

    color: ${({ theme }) => theme.colors.blue_metal[300]};

    width: 100%;

    border-radius: 8px;

    margin-top: ${verticalScale(16)}px;

    height: 48px;
    padding: 0 16px 0 16px;

    background-color: ${({ theme }) => theme.colors.gray[100]};
`;
