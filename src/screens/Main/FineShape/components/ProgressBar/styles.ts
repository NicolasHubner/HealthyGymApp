import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    width: 100%;
    height: 6px;

    background-color: ${({ theme }) => theme.colors.gray[300]}};
`;

export const ProgressBar = styled(Animated.View)`
    width: 0;
    max-width: 100%;
    height: 100%;
    max-height: 100%;

    background-color: ${({ theme }) => theme.colors.black}};

    border-radius: 999px;

    transition: all 400ms ease;
    position: relative;
`;
