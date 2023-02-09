import styled from 'styled-components/native';

export const ContainerCards = styled.ScrollView`
    flex-direction: row;
    width: 100%;
    height: 300px;
    margin-top: 24px;
    margin-bottom: 24px;
    padding-left: 20px;
`;
export const Card = styled.View`
    width: 315px;
    height: 280px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 16px;
    margin-right: 16px;
    padding: 16px;
    elevation: 20;
    shadow-color: ${({ theme }) => theme.colors.brown[500]};
    shadow-radius: 3px;
    shadow-opacity: 0.2;
`;
