import { baseBoldText, baseMediumText, baseRegularText } from '@/styles/global';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const SubTitleComparation = styled.Text`
    ${baseMediumText}
    font-size: ${16}px;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${16}px;
    width: 100%;
`;

export const PhotoTakeDate = styled.Text`
    ${baseRegularText}
    font-size: ${14}px;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 12px;
`;

export const ContainerScrollPhotos = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
    width: 100%;
    height: 60%;
    margin-bottom: ${16}px;
`;

export const ImagesEvolutions = styled.Image.attrs({
    resizeMode: 'contain',
    resizeMethod: 'resize',
})`
    width: 100%;
    height: ${scale(280)}px;
    margin-bottom: ${16}px;
    margin-right: ${16}px;
    border-radius: 8px;
`;

interface TabSelectedProps {
    selected?: boolean;
}

export const TabsContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    gap: 24px;

    width: 100%;

    border-bottom-width: 1px;
    border-bottom-color: ${({ theme }) => theme.colors.gray[300]};

    margin-bottom: 12px;
`;

export const TabIndicator = styled.View<TabSelectedProps>`
    padding: 4px;

    border-bottom-width: ${({ selected }) => (selected ? 2 : 0)}px;
    border-bottom-color: ${({ theme }) => theme.colors.green[700]};
`;

export const TabText = styled.Text<TabSelectedProps>`
    ${baseBoldText}
    font-size: ${16}px;
    color: ${({ theme, selected }) =>
        selected ? theme.colors.green[700] : theme.colors.gray[500]};
`;
