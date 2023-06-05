import { Animated } from 'react-native';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

import { baseRegularText } from '@/styles/global';

export const Container = styled(Animated.View)``;

export const Divider = styled.View`
    width: 100%;
    height: 1px;

    background-color: ${({ theme }) => theme.colors.gray[100]};

    margin: 28px 0;
`;

export const InfoList = styled.View`
    width: 100%;
    gap: 12px;
`;

export const InfoContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const InfoTitle = styled.Text`
    ${baseRegularText}
    font-size: ${13}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const InfoValue = styled.Text`
    ${baseRegularText}
    font-size: ${13}px;
    color: ${({ theme }) => theme.colors.gray[600]};
`;
