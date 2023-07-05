import { baseBoldText } from '@/styles/global';
import styled from 'styled-components/native';

export const ContainerPrincipal = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.white};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 24px;
    width: 100%;
    margin-top: -24px;
`;

export const ModalContainer = styled.View`
    /* flex: 1; */
    /* justify-self: flex-end; */
    background-color: ${({ theme }) => theme.colors.white};
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    padding: 24px;
    width: 100%;
    height: 90%;
    justify-content: space-between;
    /* bottom: 0; */
`;

export const ModatTitle = styled.Text`
    ${baseBoldText};
    text-align: center;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 24px;
`;

export const ModalInput = styled.TextInput`
    ${baseBoldText};
    border: 1px solid ${({ theme }) => theme.colors.gray[100]};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    width: 90%;
    align-self: center;
    text-align: center;
    font-size: 24px;
    margin-bottom: 32px;
    align-items: center;
    /* margin-top: 32px; */
`;

export const ButtonModal = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.green[700]};
    border-radius: 16px;
    padding: 16px;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`;

export const ButtonModalText = styled.Text`
    ${baseBoldText};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white};
`;