import { baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ContainerTop = styled.View`
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.green[500]};
    height: 410px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    padding: 24px;
`;

export const Title = styled.Text`
    ${baseRegularText}
    width: 250px;
    font-size: ${scale(50)}px;
    color: ${({ theme }) => theme.colors.white};
    margin-top: 80px;
    margin-bottom: 24px;
`;

export const Subtitle = styled.Text`
    ${baseRegularText}
    width: 250px;
    font-size: ${scale(20)}px;
    color: ${({ theme }) => theme.colors.black};
`;
export const ViewTumble = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 96%;
    margin-top: 24px;
`;
export const Tumble = styled.TouchableOpacity`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 8px;
    width: 31%;
    height: 140px;
    border-radius: 8px;
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
    width: 80px;
    height: 80px;
    border-radius: 8px;
`;
