import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';

interface CardProps {
    color: string;
}

export const Cards = styled.TouchableOpacity<CardProps>`
    width: 48%;
    height: ${scale(200)}px;
    background-color: ${({ color }) => color};
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 16px;
    elevation: 5;
    shadow-color: black;
    shadow-radius: 10px;
    shadow-opacity: 0.2;
    padding-top: 24px;
    padding-left: 20px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
