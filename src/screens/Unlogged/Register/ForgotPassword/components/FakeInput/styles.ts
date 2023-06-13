import styled from 'styled-components/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { baseRegularText } from '@/styles/global';

export const Container = styled.View`
    align-items: center;
    flex-direction: row;

    border-radius: 8px;

    width: 100%;
    height: 48px;
    padding: 0 16px 0 45px;

    background-color: ${({ theme }) => theme.colors.gray[100]};
`;

export const Icon = styled(MaterialCommunityIcons).attrs(({ theme }) => ({
    color: theme.colors.brown[500],
}))`
    position: absolute;
    left: 16px;
    z-index: 1;
`;

export const InputText = styled.Text`
    ${baseRegularText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.brown[500]};
`;
