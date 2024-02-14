import styled from 'styled-components/native';

export const ContainerPrincipal = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 24px;
    width: 100%;
    margin-top: -24px;
    /* height: auto; */
`;
