import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRoute } from '@react-navigation/native';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FakeInput } from './components/FakeInput';
import { ResetPasswordInputs } from './components/ResetPasswordInputs';
import { LogoForgotPassword } from '@/components/atoms/Logo';
import { Button } from '@/components/atoms/Button';
import { TextSubTitleGreen } from '@/components/atoms/TextSubTitleGreen';
import { RegisterMessage } from '@/components/atoms/RegisterMessage';
import { TextRequiredInputs } from '@/components/atoms/TextRequired/style';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { ControlledInput } from '@/components/organisms/ControlledInput';

import { hidePartOfString } from '@/utils/hidePartOfString';

import { useTheme } from 'styled-components';

import { ButtonContainer, ButtonIsNotMyEmail, FakeInputContainer } from './style';
import { api } from '@/services/api';

export function ForgotPassword() {
  const [pageTitle, setPageTitle] = useState('Digite seu e-mail');
  const [email, setEmail] = useState('');
  const [showNotMyEmailButton, setShowNotMyEmailButton] = useState(false);
  const [isRecoverRequested, setIsRecoverRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: '',
  });

  const routes = useRoute() as any;

  const { colors } = useTheme();

  const emailSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  const passwordSchema = yup
    .string()
    .required('O campo de senha não pode ser vazio')
    .min(6, 'A senha deve conter pelo menos 6 caracteres');

  const passwordRepeatSchema = passwordSchema.equals(
    [yup.ref('newPassword')],
    'As senhas não conferem'
  );

  const forgotSchema = yup.object().shape({
    code: yup.string().required('O código é obrigatório'),
    newPassword: passwordSchema,
    newPasswordRepeat: passwordRepeatSchema,
  });

  const verifyIfPasswordsMatch = async (first: string, second: string) => {
    console.log('verificando...');
    console.log(`${first} = ${second} ? ${first === second}`);

    if (first !== second) {
      return false;
    }

    return true;
  };

  const {
    control: controlForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
    watch: watchForgot,
  } = useForm({
    resolver: yupResolver(forgotSchema),
  });

  const {
    control: emailControl,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
    watch: watchEmail,
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const emailInput = watchEmail('email');
  const codeInput = watchForgot('code');
  const newPasswordInput = watchForgot('newPassword');
  const newPasswordRepeatInput = watchForgot('newPasswordRepeat');

  const onSubmitRequestCode = async (data: any) => {
    setIsLoading(true);
    setShowNotMyEmailButton(false);
    setError({ error: false, message: '' });

    try {
      // const response = await api.post('/forgot-password', { email: emailInput });

      setPageTitle('Enviamos um código para \n o seu e-mail');
      setIsRecoverRequested(true);
    } catch (err) {
      console.log('Ocorreu um erro ao enviar o código de recuperação: ', err);
      setError({ error: true, message: 'Ocorreu um erro ao enviar o código de recuperação' });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitResetPass = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await api.post('auth/reset-password', {
        code: codeInput,
        password: newPasswordInput,
        passwordConfirmation: newPasswordRepeatInput,
      });
    } catch (err) {
      console.log('Ocorreu um erro ao solicitar a mudança de senhas: ', err);
      setError({ error: true, message: 'Ocorreu um erro ao solicitar a mudança de senhas' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleIsNotMyEmail = () => {
    emailControl._reset({ email: '' });
    setEmail('');
    setShowNotMyEmailButton(false);
    setPageTitle('Digite seu e-mail');
  };

  useEffect(() => {
    if (routes.params?.email) {
      setEmail(routes.params.email);
      emailControl._reset({ email: routes.params.email });
      setShowNotMyEmailButton(true);
      setPageTitle('Este é seu e-mail?');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes.params]);

  useEffect(() => {
    console.log(
      JSON.stringify(
        {
          // emailInput,
          // codeInput,
          // newPasswordInput,
          // newPasswordRepeatInput,
          errorsForgot,
        },
        null,
        2
      )
    );

    if (newPasswordInput?.length >= 6 && newPasswordRepeatInput?.length >= 6) {
      if (!verifyIfPasswordsMatch(newPasswordInput, newPasswordRepeatInput)) {
        if (!error.error) {
          setError({ error: true, message: 'As senhas devem ser iguais' });
        }
      } else {
        if (error.error) {
          setError({ error: false, message: '' });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailInput, codeInput, newPasswordInput, newPasswordRepeatInput, errorsForgot]);

  return (
    <ScrollablePageWrapper>
      <LogoForgotPassword />
      <TextSubTitleGreen>{pageTitle}</TextSubTitleGreen>

      {!isRecoverRequested && (
        <>
          {showNotMyEmailButton && (
            <FakeInputContainer>
              <FakeInput
                widthInPercent={90}
                label={
                  hidePartOfString({ text: email }) ??
                  hidePartOfString({ text: 'exemplo@email.com' })
                }
              />
            </FakeInputContainer>
          )}

          {!showNotMyEmailButton && (
            <ControlledInput
              hookFormValidations={{ control: emailControl, errors: emailErrors }}
              inputName="email"
              errorMessage="Insira um e-mail válido"
              placeholder="Seu email"
              iconName="email"
              keyboardType="email-address"
            />
          )}
        </>
      )}

      {isRecoverRequested && <ResetPasswordInputs control={controlForgot} errors={errorsForgot} />}

      {/* {error.error && <TextRequiredInputs>{error.message}</TextRequiredInputs>} */}

      {!isRecoverRequested && (
        <ButtonContainer>
          <Button
            onPress={handleSubmitEmail(onSubmitRequestCode)}
            label={'Enviar'}
            isLoading={isLoading}
          />
        </ButtonContainer>
      )}

      {isRecoverRequested && (
        <ButtonContainer>
          <Button
            onPress={handleSubmitForgot(onSubmitResetPass)}
            label="Resetar senha"
            isLoading={isLoading}
          />
        </ButtonContainer>
      )}

      {showNotMyEmailButton && (
        <ButtonIsNotMyEmail>
          <Button
            backgroundColor={colors.green[500]}
            onPress={handleIsNotMyEmail}
            label="Não é meu email"
            isDisabled={false}
          />
        </ButtonIsNotMyEmail>
      )}

      <RegisterMessage />
    </ScrollablePageWrapper>
  );
}
