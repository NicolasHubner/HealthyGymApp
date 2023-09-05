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
    margin-top: ${12}px;
    /* margin-bottom: ${12}px; */
`;

export const Card = styled.View`
    width: ${scale(100)}px;
    height: ${scale(100)}px;
    background-color: ${({ theme }) => theme.colors.green[300]};
    margin-right: ${12}px;
    border-radius: ${18}px;
    justify-content: center;
    align-items: center;
`;

export const CardImage = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: ${18}px;
`;
