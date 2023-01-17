import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';
import React, { useState } from 'react';
// import { Text } from "react-native";

import {
    ButtonContainer,
    CheckBoxContainer,
    CheckBoxText,
    InputContainer,
    Inputs,
    LoginContainer,
    LoginText,
    Subtitle,
    SubtitleContainer,
    SubtitleContainerCreate,
    SubtitleCreate,
} from './styles';

import { Logo } from '@/components/atoms/Logo';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { Button } from '@/components/atoms/Button';
import { TextAsLink } from '@/components/atoms/TextAsLink';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';

export function SignUp() {
    const navigation = useNavigation() as INavigation;
    const [statusPassword, setStatusPassword] = useState<boolean>(true);
    const [statusCheckBox, setStatusCheckBox] = useState<boolean>(false);
    const [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    const handleSubmit = () => {
        console.log('Clicou no botão');
    };
    // Não pude criar alguns inputs padronizados como moléculas, pois iria alterar devido a importação de qual icone iria utilizar, tendo que fazer tudo INLINE //
    return (
        <ScrollablePageWrapper>
            <Logo />
            <SubtitleContainer>
                <Subtitle>Hei, que bom ter você por aqui</Subtitle>
            </SubtitleContainer>

            <SubtitleContainerCreate>
                <SubtitleCreate>Crie sua conta</SubtitleCreate>
            </SubtitleContainerCreate>

            <InputContainer>
                <Ionicons
                    name="person"
                    size={17}
                    color="#7B6F72"
                    style={{ position: 'absolute', left: 30, zIndex: 1 }}
                />
                <Inputs placeholder="Nome" />
            </InputContainer>

            <InputContainer>
                <AntDesign
                    name="phone"
                    size={17}
                    color="#7B6F72"
                    style={{ position: 'absolute', left: 30, zIndex: 1 }}
                />
                <Inputs placeholder="Telefone" />
            </InputContainer>

            <InputContainer>
                <MaterialCommunityIcons
                    name="email-outline"
                    size={17}
                    color="#7B6F72"
                    style={{ position: 'absolute', left: 30, zIndex: 1 }}
                />
                <Inputs placeholder="E-mail" />
            </InputContainer>

            <InputContainer>
                <AntDesign
                    name="lock"
                    size={17}
                    color="#7B6F72"
                    style={{ position: 'absolute', left: 30, zIndex: 1 }}
                />
                <Inputs secureTextEntry={statusPassword} placeholder="Senha" />
                <Entypo
                    onPress={() => setStatusPassword(!statusPassword)}
                    name={statusPassword ? 'eye' : 'eye-with-line'}
                    size={17}
                    color="#7B6F72"
                    style={{ position: 'absolute', right: 40, zIndex: 1 }}
                />
            </InputContainer>

            <CheckBoxContainer>
                {!statusCheckBox && (
                    <MaterialCommunityIcons
                        onPress={() => setStatusCheckBox(!statusCheckBox)}
                        name="checkbox-blank-outline"
                        size={24}
                        color="#AEAEB5"
                    />
                )}
                {statusCheckBox && (
                    <MaterialCommunityIcons
                        onPress={() => setStatusCheckBox(!statusCheckBox)}
                        name="checkbox-marked"
                        size={24}
                        color="#90D692"
                    />
                )}
                <CheckBoxText>
                    Ao continuar você aceita nossa Política de Privacidade e Termos de Uso
                </CheckBoxText>
            </CheckBoxContainer>

            <ButtonContainer>
                <Button label="Cadastrar" onPress={() => handleSubmit()} />
            </ButtonContainer>
            {/* // Colocar para trocar a cor quando o botão estiver desabilitado, em cor mais clara[NICOLAS] // */}

            <LoginContainer>
                <LoginText>Ja tem uma conta?</LoginText>
                <TextAsLink
                    onPress={() => navigation.navigate(RouteNames.auth.login)}
                    label="Login"
                />
            </LoginContainer>
        </ScrollablePageWrapper>
    );
}
