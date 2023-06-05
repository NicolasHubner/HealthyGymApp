import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewBoxSelection = styled.View`
    width: 96%;
    max-width: ${scale(320)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${20}px;
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
    background-color: ${({ bgColor, theme }) => bgColor || theme.colors.gray[350]};
    justify-content: center;
    align-items: center;
    margin-bottom: ${16}px;
`;

export const TextPressables = styled.Text`
    ${baseRegularText};
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.white};
    margin-top: ${12}px;
`;

export const TopText = styled.Text`
    ${baseBoldText};
    font-size: ${18}px;
    color: ${({ theme }) => theme.colors.gray[700]};
    top: ${20}px;
    right: ${12}px;
    position: absolute;
    font-weight: 700;
`;
export const TopTextMinor = styled.Text`
    ${baseRegularText};
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[700]};
`;
