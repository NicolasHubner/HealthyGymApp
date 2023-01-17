import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';
import React, { useState } from 'react';
// import { Text } from "react-native";

import {
    InputContainer,
    Inputs,
    Subtitle,
    SubtitleContainer,
    SubtitleContainerCreate,
    SubtitleCreate,
} from './styles';

import { Logo } from '@/components/atoms/Logo';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';

export function SignUp() {
    const [password, setPassword] = useState<boolean>(true);
    const [fontsLoaded] = useFonts({
        Rubik_400Regular,
        Rubik_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <PageWrapper>
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
                <Inputs placeholder="Senha" />
                <Entypo
                    onPress={() => setPassword(!password)}
                    name={password ? 'eye' : 'eye-with-line'}
                    size={17}
                    color="#7B6F72"
                    style={{ position: 'absolute', right: 40, zIndex: 1 }}
                />
            </InputContainer>
        </PageWrapper>
    );
}
