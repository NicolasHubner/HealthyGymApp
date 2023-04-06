import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { scale } from 'react-native-size-matters';

import { renderEmailInput } from './components/EmailInput';
import { LogoSquat } from '@/components/atoms/Logo';
import { Button } from '@/components/atoms/Button';
import { RegisterMessage } from '@/components/atoms/RegisterMessage';
import { TextRequired } from '@/components/atoms/TextRequired';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { ControlledInput } from '@/components/organisms/ControlledInput';
import { setUserInfo } from '@/store/user';

import { AntDesign, Entypo } from '@expo/vector-icons';

import { api } from '@/services/api';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { getGoalsUser } from '@/helpers/functions/goals/goals_type';
import { emptyGoalsForGlobalState, emptyMetricsForGlobalState } from '@/helpers/constants/goals';
import { errorHandler } from '@/utils/errorHandler';
import { saveUserDataInStorage } from '@/utils/handleStorage';

import { User } from '@/types/user';

import {
    ButtonContainer,
    ForgotPassword,
    ForgotPasswordContainer,
    InputContainer,
    Inputs,
    Subtitle,
    SubtitleContainer,
    SubtitleContainerWelcome,
    SubtitleWelcome,
} from './style';

export function Login() {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [statusPassword, setStatusPassword] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState({
        error: false,
        message: '',
    });

    const navigator = useNavigation() as INavigation;
    const dispatch = useDispatch();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const clearError = useCallback(() => {
        setLoginError({
            error: false,
            message: '',
        });
    }, []);

    const renderPasswordInput = ({
        onChange,
        value,
    }: Partial<ControllerRenderProps<FieldValues, string>>) => (
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
                            padding: scale(8),
                        }}
                    />
                </Pressable>
            </View>
        </InputContainer>
    );

    const onSubmit = async (data: any) => {
        clearError();
        setLoading(true);

        const { email, password } = data;

        const loginObject = {
            identifier: email,
            password,
        };

        try {
            const { data: loginData } = await api.post('/auth/local', loginObject);
            // console.log('loginData', loginData);

            if (!!loginData && !!loginData?.jwt) {
                const { jwt, user } = loginData;

                const goals = getGoalsUser({
                    goal_type: user?.goal_type,
                    weight: user?.weight,
                    gender: user?.gender,
                });
                const stateData: User = {
                    token: jwt,
                    ...user,
                    isCoach: user?.is_coach ?? false,
                    isLogged: true,
                    goals: {
                        ...emptyGoalsForGlobalState,
                        sleepTime: 8,
                        caloriesToIngest: goals.cal_burn,
                        waterToIngest: goals.water_ingest,
                        proteinToIngest: goals.protein_burn,
                        carbsToIngest: goals.carbo_burn,
                        fatToIngest: goals.fat_burn,
                    },
                    metrics: {
                        ...emptyMetricsForGlobalState,
                        weight: user?.weight ?? 0,
                        waterGlassSize: 200,
                    },
                };

                dispatch(setUserInfo(stateData));
                await saveUserDataInStorage(stateData);

                navigator.navigate(RouteNames.logged.home, { screen: RouteNames.logged.home });
            }
        } catch (err: any) {
            if (err?.response?.status === 400) {
                return errorHandler(err, setLoginError, 'Credenciais inválidas.');
            }

            return errorHandler(err, setLoginError, 'Ocorreu um erro ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

    const onForgotPassword = () => {
        navigator.navigate(RouteNames.auth.forgotPassword, { email: emailInput });
    };

    const emailInput = watch('email');
    const passwordInput = watch('password');

    useEffect(() => {
        if (loginError.error) {
            clearError();
        }

        if (!!emailInput && emailInput?.includes('@') && emailInput?.includes('.')) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }

        if (!!passwordInput && passwordInput.length >= 6) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailInput, passwordInput]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, width: '100%', alignItems: 'center' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollablePageWrapper bottomSpacing={56}>
                <LogoSquat />

                <SubtitleContainer>
                    <Subtitle>Hey, </Subtitle>
                </SubtitleContainer>
                <SubtitleContainerWelcome>
                    <SubtitleWelcome>Bem vindo de volta</SubtitleWelcome>
                </SubtitleContainerWelcome>

                <KeyboardAvoidingView
                    style={{ flex: 1, width: '100%', alignItems: 'center' }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <ControlledInput
                        hookFormValidations={{ control, errors }}
                        inputName="email"
                        errorMessage="Insira um email válido"
                        isRequired
                        render={renderEmailInput}
                    />

                    <ControlledInput
                        hookFormValidations={{ control, errors }}
                        inputName="password"
                        errorMessage="O campo 'senha' não pode ser vazio"
                        isRequired
                        render={({ onChange, value }) => renderPasswordInput({ onChange, value })}
                    />

                    {loginError.error && (
                        <TextRequired width={90}>{loginError.message}</TextRequired>
                    )}

                    <ForgotPasswordContainer onPress={() => onForgotPassword()}>
                        <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
                    </ForgotPasswordContainer>
                </KeyboardAvoidingView>

                <ButtonContainer>
                    <Button
                        isDisabled={
                            isDisabled ||
                            loading ||
                            !emailInput?.includes('@') ||
                            !emailInput?.includes('.')
                        }
                        isLoading={loading}
                        label="Login"
                        onPress={handleSubmit(onSubmit)}
                    />
                </ButtonContainer>

                <RegisterMessage />
            </ScrollablePageWrapper>
        </KeyboardAvoidingView>
    );
}
