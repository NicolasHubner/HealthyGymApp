import { baseRegularText } from '@/styles/global';
import { Circle } from 'react-native-progress';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    width: 100%;
    gap: 22px;
`;

export const GraphContainer = styled.View`
    align-items: center;
    justify-content: center;
`;

export const GraphicItem = styled(Circle).attrs(() => ({
    showsText: true,
    borderWidth: 0,
    size: 60,
    thickness: 8,
    direction: 'counter-clockwise',
    strokeCap: 'round',
}))``;

export const GraphText = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: ${12}px;
    margin-top: 8px;
`;
