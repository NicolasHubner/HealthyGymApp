import styled from 'styled-components/native';
import { baseBoldText, baseRegularText } from '@/styles/global';

export const SubtitleContainerCreate = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
`;

export const SubtitleCreate = styled.Text`
    ${baseBoldText}
    font-size: 20px;
    color: ${({ theme }) => theme.colors.green[700]};
    line-height: 30px;
`;

export const SubtitleContainerHelp = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 41px;
    width: 50%;
`;
export const SubtitleHelp = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.brown[500]};
    font-size: 12px;
    line-height: 18px;
    text-align: center;
`;

export const ContainerCards = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 60px 0 0;
`;
