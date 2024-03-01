import styled, { css } from 'styled-components/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.View`
    flex-direction: row;
`;

interface FireIconProps {
    isActive: boolean;
}

export const Icon = styled(MaterialCommunityIcons)<FireIconProps>`
    ${({ theme, isActive }) => css`
        color: ${isActive ? theme.colors.green[500] : theme.colors.gray[300]};
    `}
`;
