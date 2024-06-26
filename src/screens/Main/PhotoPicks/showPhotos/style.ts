import { baseMediumText } from '@/styles/global';
import { verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewTumble = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-top: 24px;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
`;

export const ViewTumbleText = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 32%;
`;

export const Tumble = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${verticalScale(122)}px;
    border-radius: 24px;
    background-color: ${({ theme }) => theme.colors.gray[450]};
`;
export const TextTumble = styled.Text`
    ${baseMediumText}
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.gray[500]};
    margin-top: ${12}px;
    margin-bottom: 16px;
`;

export const ImageTumble = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 24px;
`;
