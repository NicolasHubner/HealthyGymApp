import { baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ContainerCards = styled.ScrollView`
    flex-direction: row;
    width: 100%;
    height: 320px;
    margin-top: 24px;
    margin-bottom: 24px;
    /* padding-left: 20px; */
    /* padding-top: ; */
`;
export const Card = styled.View`
    width: 315px;
    height: 296px;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    margin-right: 16px;
    /* padding-bottom: 16px; */
    elevation: 7;
    shadow-color: ${({ theme }) => theme.colors.brown[500]};
    shadow-radius: 3px;
    shadow-opacity: 0.2;
`;
export const CardTitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    margin-left: 24px;
    width: 70%;
`;
export const CardImage = styled.Image`
    width: 100%;
    height: 156px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`;
export const CardDescription = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 16px;
    padding-horizontal: 24px;
    width: 100%;
`;

export const ProfileImage = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;
export const ProfileName = styled.Text`
    ${baseRegularText}
    font-size: ${scale(14)}px;
    color: ${({ theme }) => theme.colors.blue_metal[500]};
    margin-left: 12px;
    flex-grow: 1;
`;
export const FavoriteIcon = styled.TouchableOpacity`
    /* margin-right: 24px; */
`;
