import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const TextRequiredInputs = styled.Text`
  ${baseRegularText}
  font-size: 10px;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.red[500]};
`;
