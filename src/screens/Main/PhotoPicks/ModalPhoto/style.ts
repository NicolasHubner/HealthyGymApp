import { scale } from 'react-native-size-matters';
import { baseRegularText, baseMediumText } from '@/styles/global';
import styled from 'styled-components/native';

export const ModalBlur = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.View`
    width: 80%;
    height: 70%;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    align-items: center;
`;

export const ImageWoman = styled.Image.attrs({
    // resizeMode: 'contain',
})`
    width: 100%;
    height: 55%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const ViewTextsButton = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
    flex-grow: 1;
`;

export const TitleModal = styled.Text`
    ${baseMediumText}
    font-size: ${22}px;
    color: ${({ theme }) => theme.colors.green[500]};
    /* width: ; */
    margin-bottom: ${24}px;
    align-self: center;
`;

interface IViewButton {
    backgroundColor?: string;
    border: boolean;
}

export const ViewButton = styled.View<IViewButton>`
    width: ${scale(240)}px;
    height: ${scale(40)}px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
    border: ${({ border }) => (border ? '1px solid #000' : 'none')};
`;

interface ITextButton {
    color?: string;
}

export const TextButton = styled.Text<ITextButton>`
    ${baseRegularText}
    font-size: ${12}px;
    color: ${({ color }) => color || '#000'};
`;
