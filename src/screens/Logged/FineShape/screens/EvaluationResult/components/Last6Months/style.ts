import { baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewBoxSelection = styled.View`
    width: 96%;
    max-width: ${scale(320)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${verticalScale(24)}px;
    align-self: center;
`;

interface ViewBoxProps {
    bgColor?: string;
}

export const ViewBox = styled.Pressable<ViewBoxProps>`
    width: ${scale(80)}px;
    height: ${scale(80)}px;
    flex-direction: column;
    border-radius: 12px;
    background-color: ${({ bgColor, theme }) => bgColor || theme.colors.gray[350] };
    justify-content: center;
    align-items: center;
`;

export const TextPressables = styled.Text`
    ${baseRegularText};
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.white};
    margin-top: ${verticalScale(8)}px;
`;
