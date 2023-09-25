import { baseBoldText, baseRegularText } from '@/styles/global';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { verticalScale } from 'react-native-size-matters';

export const InputContainer = styled.View`
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 14px 20px;
    border-radius: 16px;
    width: 100%;
    align-items: center;
`;

export const InputSearchIcon = styled(AntDesign).attrs(({ theme }) => ({
    color: theme.colors.blue_metal[700],
    size: 16,
    name: 'search1',
}))``;

export const TextNoFood = styled.Text`
    ${baseRegularText};
    color: ${({ theme }) => theme.colors.blue_metal[700]};
    font-size: 16px;
    text-align: center;
    /* margin-top: ${verticalScale(24)}px; */
`;

export const TextAddFood = styled.Text`
    ${baseBoldText}
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
`;

export const ButtonAdd = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.green[700]};
    border-radius: 16px;

    justify-content: center;
    align-items: center;

    align-self: center;
    width: 90%;
    padding: 16px;
    margin-top: 24px;
`;

export const Input = styled(TextInput)`
    color: ${({ theme }) => theme.colors.blue_metal[700]};

    padding-left: 12px;
`;

export const ContainerScrollFoods = styled.ScrollView.attrs({
    // showsVerticalScrollIndicator: false,
    // alignItems: 'center',
    paddingHorizontal: 0,
    // paddingTop: 16,
    borderRadius: 8,
    // marginBottom: 64,
})`
    /* flex: 1; */
    width: 100%;
    padding: 0;
    margin-top: 16px;
    margin-bottom: 32px;
    /* margin-bottom: 64px; */
    /* margin-top: ${verticalScale(24)}px; */
    /* background-color: red; */
    /* align-items: ce; */
`;

export const Content = styled.View`
    /* background-color: ${({ theme }) => theme.colors.gray[100]}; */
    flex: 1;

    /* margin-top: -24px; */
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    /* padding: 24px; */
`;
