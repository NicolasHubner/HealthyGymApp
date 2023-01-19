import styled from 'styled-components/native';

import { baseBoldText } from '@/styles/global';

interface ContainerProps {
  isDisabled: boolean;
}

export const Container = styled.View<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.green[700]};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};

  border-radius: 16px;
  height: 56px;
  width: 260px;

  align-items: center;
  justify-content: center;
`;

export const ButtonLabel = styled.Text`
  ${baseBoldText}
  color: ${({ theme }) => theme.colors.white};
`;
