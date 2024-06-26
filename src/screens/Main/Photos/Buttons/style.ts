import { baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

interface IButtonProps {
    color: string;
    colorBorder?: string;
}

export const ButtonsPhoto = styled.View<IButtonProps>`
    align-items: center;
    justify-content: center;
    width: ${scale(300)}px;
    background-color: ${props => props.color};
    padding-vertical: ${12}px;
    border-radius: 10px;
    margin-bottom: ${12}px;
    border: ${({ colorBorder }) => (colorBorder ? `1px solid ${colorBorder}` : 'none')};
`;
export const TextButton = styled.Text`
    ${baseRegularText}
    color: #fff;
    font-size: ${12}px;
`;
