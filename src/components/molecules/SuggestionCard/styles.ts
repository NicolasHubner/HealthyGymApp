import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #fff;
    max-width: 158px;
    max-height: 260px;
    border-radius: 8px;
    elevation: 5;
    shadow-color: black;
    shadow-radius: 10px;
    shadow-opacity: 0.2;
`;

export const ImageContainer = styled.View``;

export const Image = styled.Image.attrs({
    resizeMode: 'cover',
    resizeMethod: 'scale',
})`
    width: 100%;
    height: 99px;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

export const InfoContent = styled.View`
    padding: 0 16px;
`;

export const Title = styled.Text`
    ${baseBoldText}
    font-size: ${14}px;
    margin: 8px 0 0;
    color: ${({ theme }) => theme.colors.black};
`;

export const Description = styled.Text`
    ${baseRegularText}
    font-size: ${13}px;
    margin: 8px 0 0;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const ButtonContainer = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.green[700]};
    opacity: 0.8;
    border-radius: 8px;

    align-items: center;
    justify-content: center;

    padding: 8px 0;
    margin: 16px 0 0;
`;

export const ButtonText = styled.Text`
    ${baseBoldText}
    font-size: ${13}px;
    color: ${({ theme }) => theme.colors.white};
`;
