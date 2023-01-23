import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.green[500]};
  width: 100%;

  flex-direction: row;

  padding: 16px 0 24px;
`;

export const Divider = styled.View`
  width: 8px;
  height: 100%;
`;
