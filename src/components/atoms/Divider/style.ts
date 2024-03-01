import styled from 'styled-components/native';

interface DividerProps {
    marginTop?: number;
    width?: string;
}

export const Divider = styled.View<DividerProps>`
    width: ${({ width }) => (width ? `${width}` : '100%')};
    height: 1px;
    background-color: rgba(0, 0, 0, 0.04);
    margin-top: ${({ marginTop }) => `${marginTop}px`};
`;
