import styled from 'styled-components/native';
import { Container } from '@/components/molecules/RegisterInput/styles';
import { baseRegularText } from '@/styles/global';

export const InputContainer = styled.View`
    width: 100%;
    margin-top: 16px;
    justify-content: center;
`;

export const ButtonContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    margin: 60px 0 0;
`;

export const InputDateContainer = styled(Container)`
    width: 90%;
    margin: 0 auto;
    justify-content: flex-start;
`;
export const TextDateShow = styled.Text`
    ${baseRegularText}
    color: ${({ theme }) => theme.colors.blue_metal[100]};
    /* margin-left: px; */
    font-size: 12px;
`;

export const FormContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    padding: 0 24px;
`;
