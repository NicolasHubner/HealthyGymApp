import { baseRegularText } from '@/styles/global';
import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const PageContainerUserPhotos = styled.View`
    width: 100%;
    height: ${verticalScale(500)}px;

    background-color: #fff;

    margin-top: auto;
    padding: 24px;

    /* align-items: center; */

    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
`;

export const TextAddOrRemovePhoto = styled.Text`
    ${baseRegularText}
    font-size: 16px;
    color: #000;
    text-align: center;
`;

export const ProfileLogoUserPhoto = styled.Image`
    width: 200px;
    height: 240px;
    border-radius: 16px;
    /* margin-top: 16px; */
    /* margin-right: 28px; */
`;
