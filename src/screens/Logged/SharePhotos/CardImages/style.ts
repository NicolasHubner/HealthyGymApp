import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ContainerImages = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
    width: 100%;
    flex-direction: row;
    /* align-items: center; */
    height: ${scale(120)}px;
    /* background-color: red; */
    margin-top: ${scale(10)}px;
    /* margin-bottom: ${scale(10)}px; */
`;

export const Card = styled.View`
    width: ${scale(100)}px;
    height: ${scale(100)}px;
    background-color: green;
    margin-right: ${scale(10)}px;
    border-radius: ${scale(10)}px;
`;
export const CardImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: ${scale(10)}px;
`;
