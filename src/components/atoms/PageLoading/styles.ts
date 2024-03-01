import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.background};
`;

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
    color: theme.colors.blue_metal[700],
}))`
    margin-top: 24px;
`;

export const ImageLogo = styled.Image`
    width: 160px;
    height: 160px;
`;
