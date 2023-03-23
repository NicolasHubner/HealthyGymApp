import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { baseMediumText } from '@/styles/global';

const { height, width } = Dimensions.get('window');

export const ContainerSharePhotos = styled.View`
    width: ${width}px;
    height: ${height}px;
    align-items: center;
    /* padding-top: ${scale(30)}px; */
`;

export const ImagePhotos = styled.Image`
    width: ${scale(300)}px;
    height: ${scale(360)}px;
    border-radius: ${scale(10)}px;
    margin-top: ${scale(40)}px;
`;

export const ContainerImagesShared = styled.View`
    width: 100%;
    height: ${scale(170)}px;
    flex-direction: column;
    bottom: 0;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.white};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding-top: ${scale(20)}px;
    padding-left: ${scale(20)}px;
`;

export const TitleContainer = styled.Text`
    ${baseMediumText}
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.green[500]};
    margin-top: ${scale(10)}px;
    text-transform: uppercase;
    letter-spacing: 2px;
`;
