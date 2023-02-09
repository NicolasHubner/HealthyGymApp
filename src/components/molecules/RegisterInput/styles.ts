import styled from 'styled-components/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.View`
    align-items: center;
    justify-content: center;

    flex-direction: row;

    border-radius: 8px;

    flex-grow: 1;
    height: 48px;
    padding: 0 16px 0 45px;

    background-color: ${({ theme }) => theme.colors.gray[100]};
`;

export const InputWeightAndHeight = styled.TextInput.attrs(({ theme }) => ({
    placeholderTextColor: theme.colors.blue_metal[100],
    selectionColor: theme.colors.blue_metal[100],
}))`
    flex-grow: 1;
    margin: 0;

    color: ${({ theme }) => theme.colors.blue_metal[300]};
`;

export const Icon = styled(MaterialCommunityIcons).attrs(({ theme }) => ({
    color: theme.colors.brown[500],
}))`
    position: absolute;
    left: 16px;
    z-index: 1;
`;
