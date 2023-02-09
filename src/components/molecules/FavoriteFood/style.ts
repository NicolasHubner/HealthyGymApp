import styled from 'styled-components/native';

export const ContainerButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-top: 16px;
`;
