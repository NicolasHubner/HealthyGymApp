import styled from 'styled-components/native';

export const ContainerColection = styled.View`
    /* flex: 1; */
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    height: 200px;
`;
export const ContainerSubtitle = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    margin-top: 16px;
    margin-horizontal: 28px;
`;
