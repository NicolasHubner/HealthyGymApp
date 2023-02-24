import { baseMediumText, baseRegularText } from '@/styles/global';
import { Circle } from 'react-native-progress';
import { scale } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const GraphContent = styled.View`
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const GraphProgressText = styled.Text`
    ${baseMediumText}
    font-size: ${scale(36)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;

export const GraphSubtitle = styled.Text`
    ${baseRegularText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;

export const GraphIcon = styled(MaterialCommunityIcons).attrs(({ theme }) => ({
    name: 'run',
    size: 40,
    color: theme.colors.green[500],
}))``;

export const BigGraphic = styled(Circle).attrs(({ theme }) => ({
    animated: true,
    showsText: true,
    color: theme.colors.green[500],
    borderWidth: 0,
    size: 210,
    thickness: 12,
    direction: 'counter-clockwise',
    strokeCap: 'round',
    unfilledColor: theme.colors.gray[300],
}))``;
