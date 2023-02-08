import { baseBoldText } from './../../../styles/global';
import styled from 'styled-components/native';

interface ITextProps {
  size: number;
}

export const TextTitle = styled.Text<ITextProps>`
  ${baseBoldText}
  font-size: ${props => props.size}px;
  letter-spacing: 0.5px;
`;
