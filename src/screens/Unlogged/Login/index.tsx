import React, { useState } from 'react';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { LogoSquat } from '@/components/atoms/Logo';
import {
    ButtonContainer,
    ForgotPassword,
    ForgotPasswordContainer,
    InputContainer,
    Inputs,
    RegisterContainer,
    RegisterText,
    Subtitle,
    SubtitleContainer,
    SubtitleContainerWelcome,
    SubtitleWelcome,
} from './style';
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Button } from '@/components/atoms/Button';
import { TextAsLink } from '@/components/atoms/TextAsLink';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';

export function Login() {
    const navigation = useNavigation() as INavigation;
    const handleSubmit = () => {
        console.log('Clicou no botão');
    };
    const [statusPassword, setStatusPassword] = useState<boolean>(true);
    return (
        <ScrollablePageWrapper>
            <LogoSquat />
            <SubtitleContainer>
                <Subtitle>Hey, </Subtitle>
            </SubtitleContainer>
            <SubtitleContainerWelcome>
                <SubtitleWelcome>Bem vindo de volta</SubtitleWelcome>
            </SubtitleContainerWelcome>
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
            <ForgotPasswordContainer>
                <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
            </ForgotPasswordContainer>

            <ButtonContainer>
                <Button label="Login" onPress={() => handleSubmit()} />
            </ButtonContainer>
            {/* // Colocar para trocar a cor quando o botão estiver desabilitado, em cor mais clara[NICOLAS] // */}
            <RegisterContainer>
                <RegisterText>Não tem uma conta ainda?</RegisterText>
                <TextAsLink
                    onPress={() => navigation.navigate(RouteNames.auth.register.initial)}
                    label="Registro"
                />
            </RegisterContainer>
        </ScrollablePageWrapper>
    );
}
