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
    TextRequired,
} from './style';
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Button } from '@/components/atoms/Button';
import { TextAsLink } from '@/components/atoms/TextAsLink';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { Controller, useForm } from 'react-hook-form';

// interface LoginFormData {
//     email: string;
//     password: string;
// }

export function Login() {
    const navigation = useNavigation() as INavigation;
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = data => console.log('cachorro', data);

    const [statusPassword, setStatusPassword] = useState<boolean>(true);
    //Ver como resetar a página quando mudar e o Erros não aparecerem mais[NICOLAs]
    return (
        <ScrollablePageWrapper>
            <LogoSquat />
            <SubtitleContainer>
                <Subtitle>Hey, </Subtitle>
            </SubtitleContainer>
            <SubtitleContainerWelcome>
                <SubtitleWelcome>Bem vindo de volta</SubtitleWelcome>
            </SubtitleContainerWelcome>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputContainer>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={17}
                            color="#7B6F72"
                            style={{ position: 'absolute', left: 30, zIndex: 1 }}
                        />
                        <Inputs
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="E-mail"
                            value={value}
                        />
                    </InputContainer>
                )}
            />
            {errors.email && <TextRequired>This is required.</TextRequired>}

            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <InputContainer>
                        <AntDesign
                            name="lock"
                            size={17}
                            color="#7B6F72"
                            style={{ position: 'absolute', left: 30, zIndex: 1 }}
                        />
                        <Inputs
                            onChangeText={onChange}
                            secureTextEntry={statusPassword}
                            placeholder="Senha"
                            value={value}
                            onBlur={onBlur}
                        />
                        <Entypo
                            onPress={() => setStatusPassword(!statusPassword)}
                            name={statusPassword ? 'eye' : 'eye-with-line'}
                            size={17}
                            color="#7B6F72"
                            style={{ position: 'absolute', right: 40, zIndex: 1 }}
                        />
                    </InputContainer>
                )}
            />
            {errors.password && <TextRequired>This is required.</TextRequired>}

            <ForgotPasswordContainer>
                <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
            </ForgotPasswordContainer>

            <ButtonContainer>
                <Button label="Login" onPress={handleSubmit(onSubmit)} />
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
