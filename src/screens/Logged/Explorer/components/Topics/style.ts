import { baseBoldText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ContainerTopics = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    padding-top: 28px;
    /* padding-horizontal: 28px; */
`;
interface IContainerSubtitle {
    marginTop?: number;
}

export const ContainerSubtitle = styled.View<IContainerSubtitle>`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 16px; */
    margin-top: ${({ marginTop }) => marginTop || 0}px;
    margin-horizontal: 28px;
`;

export const ScrollViewTopics = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
        alignItems: 'center',
        paddingRight: 64,
    },
})`
    flex-direction: row;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`;
export const ContainerCardInspiration = styled.View`
    width: 100%;
    flex-direction: row;
    height: 120px;
    background-color: ${({ theme }) => theme.colors.brown};
    /* padding-top: 28px; */
    padding-horizontal: 28px;
    align-items: center;
`;
export const CardImageInspiration = styled.Image`
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin-right: 16px;
`;
export const ViewText = styled.View`
    width: 72%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

export const CardTextInspiration = styled.Text`
    ${baseBoldText}
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
`;

export const CardTextInspirationSmall = styled.Text`
    font-size: ${12}px;
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    opacity: 0.5;
    margin-top: 8px;
`;
export const InspirationsCards = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
export const ViewCardKey = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
