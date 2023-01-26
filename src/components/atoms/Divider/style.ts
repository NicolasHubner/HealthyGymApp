import styled from 'styled-components/native';

interface DividerProps {
  marginTop?: number;
}

export const Divider = styled.View<DividerProps>`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.04);
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '16px')};
`;
