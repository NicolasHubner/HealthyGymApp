import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  width: 90%;
  height: 140px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  margin-top: 12px;
  padding-left: 26px;
  padding-top: 31px;
  padding-bottom: 26px;
  elevation: 20;
  shadow-color: ${({ theme }) => theme.colors.brown[500]};
  shadow-radius: 20px;
  shadow-opacity: 0.1;
`;
