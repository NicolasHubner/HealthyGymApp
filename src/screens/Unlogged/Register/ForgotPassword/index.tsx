import React, { useState } from 'react';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { LogoForgotPassword } from '@/components/atoms/Logo';
import { ButtonContainer, ButtonIsNotMyEmail } from './style';
import { useForm } from 'react-hook-form';
import { ControlledInput } from '@/components/organisms/ControlledInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, ButtonNotMyEmail } from '@/components/atoms/Button';
import { RegisterMessage } from '@/components/atoms/RegisterMessage';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { ImageCorrectLogo } from '@/components/atoms/Images';
import { TextSubTitleGreen } from '@/components/atoms/TextSubTitleGreen';

export function ForgotPassword() {
  const [text, setSubtitle] = useState('Este é seu e-mail?');
  const routes = useRoute();
  const [email, setEmail] = useState<string>(routes.params.email);
  const [show, setShow] = useState(true);
  const navigator = useNavigation() as INavigation;

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
  console.log(watch('email'));

  const onSubmit = data => {
    console.log('cachorro', data);
    setSubtitle('Enviamos um link no seu e-mail');
    setShow(false);
  };

  return (
    <PageWrapper>
      <LogoForgotPassword />
      <TextSubTitleGreen>{email.length === 0 ? 'Digite seu email' : text}</TextSubTitleGreen>
      {show && (
        <ControlledInput
          hookFormValidations={{ control, errors }}
          inputName="email"
          errorMessage="É necessário informar um email válido"
          placeholder={routes.params.email || 'Seu email'}
          iconName="email"
          keyboardType="email-address"
        />
      )}
      {!show && <ImageCorrectLogo />}
      <ButtonContainer>
        <Button
          onPress={show ? handleSubmit(onSubmit) : () => navigator.navigate(RouteNames.auth.login)}
          label={show ? 'Enviar' : 'Ok'}
        />
      </ButtonContainer>
      {show && (
        <ButtonIsNotMyEmail>
          <ButtonNotMyEmail
            // onPress={() => navigation.navigate(RouteNames.auth.register.initial)}
            label="Não é meu email"
          />
        </ButtonIsNotMyEmail>
      )}
      <RegisterMessage />
    </PageWrapper>
  );
}
