import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const InputContainerWeightAndHeight = styled.View`
  width: 90%;
  flex-direction: row;
  margin-top: 16px;
  /* justify-content: flex-start; */
  align-items: center;
`;

export const ContainerKGandM = styled.View`
  width: 51px;
  margin-left: 10px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.green[500]};
  height: 48px;
  border-radius: 8px;
`;

export const TextKGandM = styled.Text`
  ${baseRegularText}
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  letter-spacing: 1px;
`;
