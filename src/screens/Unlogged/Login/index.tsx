import React, { useCallback, useEffect, useState } from 'react';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { LogoSquat } from '@/components/atoms/Logo';
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
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Button } from '@/components/atoms/Button';
import { ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { RegisterMessage } from '@/components/atoms/RegisterMessage';
import { TextRequired } from '@/components/atoms/TextRequired';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { ControlledInput } from '@/components/organisms/ControlledInput';
import { api } from '@/services/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { renderEmailInput } from './components/EmailInput';

export function Login() {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [statusPassword, setStatusPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState({
    error: false,
    message: '',
  });

  const navigator = useNavigation() as INavigation;

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
      <Entypo
        onPress={() => setStatusPassword(!statusPassword)}
        name={statusPassword ? 'eye' : 'eye-with-line'}
        size={17}
        color="#7B6F72"
        style={{ position: 'absolute', right: 40, zIndex: 1 }}
      />
    </InputContainer>
  );

  const onSubmit = async (data: any) => {
    clearError();
    setLoading(true);

    const { email, password } = data;

    console.log({ email, password });

    const loginObject = {
      identifier: email,
      password,
    };

    try {
      const response = await api.post('/auth/local', loginObject);

      console.log({ data: response.data });
    } catch (err) {
      console.log('Ocorreu um erro ao realizar o login: ', err);
      setLoginError({
        error: true,
        message: 'Credenciais inválidas.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log({ loginError });
  }, [loginError]);

  useEffect(() => {
    const email = watch('email');
    const password = watch('password');

    if (loginError.error) {
      clearError();
    }

    if (!!email && email.includes('@') && email.includes('.')) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    if (!!password && password.length >= 5) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('email'), watch('password')]);

  return (
    <ScrollablePageWrapper>
      <LogoSquat />
      <SubtitleContainer>
        <Subtitle>Hey, </Subtitle>
      </SubtitleContainer>
      <SubtitleContainerWelcome>
        <SubtitleWelcome>Bem vindo de volta</SubtitleWelcome>
      </SubtitleContainerWelcome>

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

      {loginError.error && <TextRequired width={90}>{loginError.message}</TextRequired>}

      <ForgotPasswordContainer
        onPress={() => {
          navigator.navigate(RouteNames.auth.forgotPassword, { email: watch('email') });
        }}>
        <ForgotPassword>Esqueceu sua senha?</ForgotPassword>
      </ForgotPasswordContainer>

      <ButtonContainer>
        <Button
          isDisabled={isDisabled || loading}
          isLoading={loading}
          label="Login"
          onPress={handleSubmit(onSubmit)}
        />
      </ButtonContainer>

      <RegisterMessage />
    </ScrollablePageWrapper>
  );
}
