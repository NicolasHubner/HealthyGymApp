import { baseMediumText, baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewImageInfo = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
    /* align-items: center; */
    margin-top: ${verticalScale(24)}px;
    margin-bottom: ${verticalScale(32)}px;
`;

export const ImageSizeImport = styled.Image.attrs({
    resizeMode: 'contain',
})`
    width: ${verticalScale(156)}px;
    height: ${verticalScale(256)}px;
`;

export const TextsContainer = styled.View`
    width: 50%;
    height: ${verticalScale(256)}px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* background-color: red; */
`;

export const ViewTextsSizes = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 33%;
`;

interface TextSizeProps {
    color: string;
}

export const TextTitle = styled.Text`
    ${baseMediumText};
    font-size: ${verticalScale(20)}px;
    color: ${({ theme }) => theme.colors.gray[600]};
    text-align: center;
`;

export const ViewTextSize = styled.View`
    /* width: 100%; */
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

export const TextSize = styled.Text<TextSizeProps>`
    ${baseMediumText};
    font-size: ${verticalScale(20)}px;
    color: ${({ color }) => color};
    text-align: center;
`;

export const TextCm = styled.Text`
    ${baseRegularText};
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.gray[600]};
    text-align: center;
`;
