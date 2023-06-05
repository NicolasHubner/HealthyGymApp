import { baseBoldText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ContentBody = styled.View`
    gap: 24px;
`;

export const InfoRow = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const IconWrapper = styled.View`
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;
`;

export const InfoTitle = styled.Text`
    ${baseRegularText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[600]};
    margin-left: 24px;
`;

export const InfoValue = styled.Text`
    ${baseBoldText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[600]};
    margin-left: auto;
`;
