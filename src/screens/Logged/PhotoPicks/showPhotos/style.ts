import { baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ViewTumble = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 98%;
    margin-top: 24px;
`;
export const Tumble = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* padding-bottom: 8px; */
    width: 31%;
    height: ${verticalScale(152)}px;
    border-radius: 8px;
    margin-left: 8px;
    background-color: ${({ theme }) => theme.colors.green[500]};
`;
export const TextTumble = styled.Text`
    ${baseRegularText}
    font-size: ${scale(16)}px;
    color: ${({ theme }) => theme.colors.black};
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const ImageTumble = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 8px;
`;
