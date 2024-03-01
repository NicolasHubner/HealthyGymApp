import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Logo } from '@/components/atoms/Logo';
import { Button } from '@/components/atoms/Button';
import { TextAsLink } from '@/components/atoms/TextAsLink';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { NewControlledInput } from '@/components/molecules/NewControlledInput';

import { INavigation } from '@/helpers/interfaces/INavigation';
import { applyPhoneMask } from '@/helpers/functions/formatInputsFunctions';
import { formShape } from './helpers/yupSchemas';
import { RouteNames } from '@/routes/routes_names';

import { setUserInfo } from '@/store/user';

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

export function SignUp() {
    const [statusPassword, setStatusPassword] = useState<boolean>(true);
    const [statusCheckBox, setStatusCheckBox] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const dispatch = useDispatch();

    const navigation = useNavigation() as INavigation;

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        resolver: yupResolver(formShape),
    });

    const email = watch('email');
    const password = watch('password');
    const name = watch('name');
    const phone = watch('phone');

    const disableSubmitButtonWhenInputsWereEmpty = useCallback(() => {
        if (email && password && name && phone && statusCheckBox) {
            setIsDisabled(false);
            return;
        } else {
            setIsDisabled(true);
            return;
        }
    }, [email, password, name, phone, statusCheckBox]);

    const onSubmit = (data: any) => {
        const userObject = {
            ...data,
            passwordForRegister: data?.password,
            name: data?.name,
            username: data?.email.toLowerCase(),
            phone: data?.phone?.replace(/\D/g, ''),
        };

        try {
            dispatch(setUserInfo(userObject));
            navigation.navigate(RouteNames.auth.register.sizes);
        } catch (err) {
            console.error('Ocorreu um erro ao salvar as informações do usuário.', err);
        }
    };

    useEffect(() => {
        disableSubmitButtonWhenInputsWereEmpty();

        return () => {
            disableSubmitButtonWhenInputsWereEmpty();
        };
    }, [email, password, name, phone, disableSubmitButtonWhenInputsWereEmpty]);

    return (
        <KeyboardAvoidingView
            style={{ width: '100%', flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollablePageWrapper bottomSpacing>
                <Logo />
                <SubtitleContainer>
                    <Subtitle>Hei, que bom ter você por aqui</Subtitle>
                </SubtitleContainer>

                <SubtitleContainerCreate>
                    <SubtitleCreate>Crie sua conta</SubtitleCreate>
                </SubtitleContainerCreate>
                <NewControlledInput
                    errors={errors}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <InputContainer>
                            <Ionicons
                                name="person"
                                size={17}
                                color="#7B6F72"
                                style={{ position: 'absolute', left: 30, zIndex: 1 }}
                            />
                            <Inputs
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder="Nome"
                            />
                        </InputContainer>
                    )}
                />

                <NewControlledInput
                    errors={errors}
                    control={control}
                    rules={{
                        required: true,
                    }}
                    name="phone"
                    render={({ field: { onChange: _, onBlur, value } }) => (
                        <InputContainer>
                            <AntDesign
                                name="phone"
                                size={17}
                                color="#7B6F72"
                                style={{ position: 'absolute', left: 30, zIndex: 1 }}
                            />
                            <Inputs
                                maxLength={15}
                                onChangeText={text => {
                                    setValue('phone', applyPhoneMask(text));
                                }}
                                onBlur={onBlur}
                                value={value}
                                keyboardType="numeric"
                                placeholder="Telefone"
                            />
                        </InputContainer>
                    )}
                />

                <NewControlledInput
                    errors={errors}
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
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                placeholder="E-mail"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </InputContainer>
                    )}
                />

                <NewControlledInput
                    errors={errors}
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
                                onBlur={onBlur}
                                value={value}
                                secureTextEntry={statusPassword}
                                placeholder="Senha"
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 32,
                                }}>
                                <Pressable onPress={() => setStatusPassword(!statusPassword)}>
                                    <Entypo
                                        name={statusPassword ? 'eye' : 'eye-with-line'}
                                        size={18}
                                        color="#7B6F72"
                                        style={{
                                            zIndex: 1,
                                            padding: 8,
                                        }}
                                    />
                                </Pressable>
                            </View>
                        </InputContainer>
                    )}
                />

                <CheckBoxContainer>
                    {!statusCheckBox && (
                        <MaterialCommunityIcons
                            onPress={() => setStatusCheckBox(!statusCheckBox)}
                            name="checkbox-blank-outline"
                            size={28}
                            color="#AEAEB5"
                        />
                    )}
                    {statusCheckBox && (
                        <MaterialCommunityIcons
                            onPress={() => setStatusCheckBox(!statusCheckBox)}
                            name="checkbox-marked"
                            size={28}
                            color="#90D692"
                        />
                    )}
                    <CheckBoxText>
                        Ao continuar você aceita nossa Política de Privacidade e Termos de Uso
                    </CheckBoxText>
                </CheckBoxContainer>

                <ButtonContainer>
                    <Button
                        isDisabled={isDisabled}
                        label="Cadastrar"
                        onPress={handleSubmit(onSubmit)}
                    />
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
        </KeyboardAvoidingView>
    );
}
