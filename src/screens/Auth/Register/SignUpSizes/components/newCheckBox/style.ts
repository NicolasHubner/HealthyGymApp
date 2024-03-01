import { baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';

export const ContainerCheckBox = styled.View`
    flex-direction: row;
    align-items: center;
    /* margin-bottom: 10px; */
    /* background-color: red; */
    padding-left: ${16}px;
    margin-left: ${24}px;
    /* justify-content: center; */
    /* margin-top: ${12}px; */
    width: 100%;
`;

export const CheckBox = styled.View`
    flex-direction: row;
    align-items: center;
    margin-right: 32px;
`;

export const TextCheckBox = styled.Text`
    ${baseRegularText}
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray[500]};
`;
