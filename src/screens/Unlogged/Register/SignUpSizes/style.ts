import styled from 'styled-components/native';
import { Container } from '@/components/molecules/RegisterInput/styles';
import { baseRegularText } from '@/styles/global';
import { scale, verticalScale } from 'react-native-size-matters';
import { TextInput } from 'react-native-gesture-handler';

export const InputContainer = styled.View`
    width: 100%;
    margin-top: 16px;
    justify-content: center;
`;

export const ViewContainerCheckBox = styled.View`
    width: 100%;
    margin-top: ${verticalScale(24)}px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
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
    font-size: ${scale(12)}px;
`;

export const FormContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;

    padding: 0 24px;
`;

export const DateInputContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    justify-content: flex-start;
`;

export const DateInput = styled(TextInput).attrs({
    placeholderTextColor: '#B7B7CC',
    selectionColor: '#B7B7CC',
})`
    ${baseRegularText}
    width: 100%;
    height: 48px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    padding: 0 16px;
    padding-left: 45px;
    margin: 0 auto;
    font-size: ${scale(12)}px;
    color: ${({ theme }) => theme.colors.blue_metal[300]};
`;
