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
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* margin-bottom: 16px; */
    margin-top: ${({ marginTop }) => marginTop || 0}px;
    margin-left: 28px;
`;

export const ScrollViewTopics = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {
        alignItems: 'center',
    },
})`
    flex-direction: row;
    width: 100%;
    padding-left: 20px;
`;
