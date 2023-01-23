import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.green[500]};
  width: 100%;

  flex-direction: row;
`;
