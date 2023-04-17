import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors.gray[500]};
    min-width: 1px;
    min-height: 1px;
`;
