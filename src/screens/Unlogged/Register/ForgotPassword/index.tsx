import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';

import { FakeInput } from './components/FakeInput';
import { LogoForgotPassword } from '@/components/atoms/Logo';
import { ImageCorrectLogo } from '@/components/atoms/Images';
import { Button } from '@/components/atoms/Button';
import { TextSubTitleGreen } from '@/components/atoms/TextSubTitleGreen';
import { RegisterMessage } from '@/components/atoms/RegisterMessage';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { ControlledInput } from '@/components/organisms/ControlledInput';

import { RouteNames } from '@/routes/routes_names';
import { hidePartOfString } from '@/utils/hidePartOfString';
import { INavigation } from '@/helpers/interfaces/INavigation';

import { useTheme } from 'styled-components';

import { ButtonContainer, ButtonIsNotMyEmail } from './style';

export function ForgotPassword() {
  const [pageTitle, setPageTitle] = useState('Digite seu e-mail');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(true);
  const [showNotMyEmailButton, setShowNotMyEmailButton] = useState(false);

  const routes = useRoute() as any;
  const { navigate } = useNavigation() as INavigation;

  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: email,
    },
  });

  const emailInput = watch('email');

  const onSubmit = (data: any) => {
    console.log('cachorro', data);
    setPageTitle('Enviamos um código no seu e-mail');
    setShow(false);
  };

  const handleIsNotMyEmail = () => {
    control._reset({ email: '' });
    setEmail('');
    setShowNotMyEmailButton(false);
    setPageTitle('Digite seu e-mail');
  };

  useEffect(() => {
    if (routes.params?.email) {
      setEmail(routes.params.email);
      setShowNotMyEmailButton(true);
      setPageTitle('Este é seu e-mail?');
    }
  }, [routes.params]);

  useEffect(() => {
    console.log(emailInput);
  }, [emailInput]);

  return (
    <PageWrapper>
      <LogoForgotPassword />
      <TextSubTitleGreen>{pageTitle}</TextSubTitleGreen>

      {showNotMyEmailButton && (
        <FakeInput
          widthInPercent={90}
          label={
            hidePartOfString({ text: email }) ?? hidePartOfString({ text: 'exemplo@email.com' })
          }
        />
      )}

      {!showNotMyEmailButton && (
        <ControlledInput
          hookFormValidations={{ control, errors }}
          inputName="email"
          errorMessage="Insira um e-mail válido"
          placeholder="Seu email"
          iconName="email"
          keyboardType="email-address"
        />
      )}

      {!show && <ImageCorrectLogo />}

      <ButtonContainer>
        <Button
          onPress={show ? handleSubmit(onSubmit) : () => navigate(RouteNames.auth.login)}
          label={show ? 'Enviar' : 'Ok'}
        />
      </ButtonContainer>

      <ButtonIsNotMyEmail>
        <Button
          backgroundColor={colors.green[500]}
          onPress={() => setEmail('teste@teste.com')}
          label="Teste"
          isDisabled={false}
        />
      </ButtonIsNotMyEmail>

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
    </PageWrapper>
  );
}
