import { baseMediumText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
    margin-top: 40px;
`;

export const Subtitle = styled.Text`
    ${baseMediumText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.green[700]};
    text-transform: uppercase;
    letter-spacing: 2px;
    align-self: center;
    margin-bottom: 8px;
`;

export const Title = styled.Text`
    ${baseMediumText}
    font-size: ${22}px;
    align-self: center;
    text-align: center;
`;

export const TitleHighlight = styled(Title)`
    color: ${({ theme }) => theme.colors.green[700]};
`;
