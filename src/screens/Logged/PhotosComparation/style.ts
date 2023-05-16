import { baseMediumText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const SubTitleComparation = styled.Text`
    ${baseMediumText}
    font-size: ${scale(20)}px;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${scale(16)}px;
    width: 100%;
`;

export const ContainerScrollPhotos = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
    width: 100%;
    height: 60%;
    margin-bottom: ${verticalScale(16)}px;
`;

export const ImagesEvolutions = styled.Image`
    width: ${scale(180)}px;
    height: ${scale(320)}px;
    margin-bottom: ${scale(16)}px;
    margin-right: ${scale(16)}px;
    border-radius: 8px;
`;
