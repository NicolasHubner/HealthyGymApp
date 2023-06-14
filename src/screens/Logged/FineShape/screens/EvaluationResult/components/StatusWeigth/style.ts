import { baseBoldText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewBoxSelectWeight = styled.View`
    /* width: 96%; */
    /* max-width: ${scale(320)}px; */
    padding-left: ${16}px;
    padding-right: ${16}px;
    flex-direction: row;
    justify-content: space-between;
    /* align-items: center; */
    margin-top: ${20}px;
    margin-bottom: ${verticalScale(48)}px;
    align-self: center;
`;

interface ViewBoxProps {
    bgColor?: string;
}

export const ViewBox = styled.View<ViewBoxProps>`
    width: ${scale(115)}px;
    height: ${scale(240)}px;
    flex-direction: column;
    align-items: center;
    /* background-color: red; */
`;

interface TextPressablesProps {
    color?: string;
}

export const TextPressables = styled.Text<TextPressablesProps>`
    ${baseBoldText};
    font-size: ${14}px;
    color: ${({ color }) => color || '#BBB9B6'};
`;

interface ViewBoxWeightProps {
    bgColor?: string;
}

export const ViewBoxWeight = styled.View<ViewBoxWeightProps>`
    width: 90%;
    height: ${scale(219)}px;
    border-radius: 12px;
    background-color: ${({ bgColor }) => bgColor};
    justify-content: center;
    align-items: center;
    margin-top: ${12}px;
`;

export const ImageWeight = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: ${scale(120)}px;
    height: 90%;
`;
