import styled from 'styled-components/native';

export const Container = styled.View``;

export const Content = styled.View`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  height: 100%;

  margin-top: -24px;
  border-radius: 30px 30px 0 0;
  padding: 16px;
`;
