import { useNavigation } from '@react-navigation/native';
import React from 'react';
// import { Text } from 'react-native';

import {
  ButtonContainer,
  LoginContainer,
  LoginText,
  OnboardImage,
  Subtitle,
  SubtitleContainer,
  TextHighlight,
  Title,
  TitleContainer,
} from './styles';

import onboardImg from '@/assets/onboard_01.png';
import { Button } from '@/components/atoms/Button';
import { Logo } from '@/components/atoms/Logo';
import { TextAsLink } from '@/components/atoms/TextAsLink';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';

export function RegisterSplash() {
  const navigation = useNavigation() as INavigation;
  return (
    <PageWrapper>
      <Logo />

      <TitleContainer>
        <Title>Nós somos a</Title>
        <TextHighlight>
          Cross Life <Title>workout</Title>
        </TextHighlight>
      </TitleContainer>

      <SubtitleContainer>
        <Subtitle>Aqui o seu desenvolvimento </Subtitle>
        <Subtitle>está em primeiro lugar</Subtitle>
      </SubtitleContainer>

      <OnboardImage source={onboardImg} />

      <ButtonContainer>
        <Button
          onPress={() => navigation.navigate(RouteNames.auth.register.initial)}
          label="Vamos começar"
        />
      </ButtonContainer>

      <LoginContainer>
        <LoginText>Ja tem uma conta?</LoginText>
        <TextAsLink onPress={() => navigation.navigate(RouteNames.auth.login)} label="Login" />
      </LoginContainer>

      <TextAsLink
        onPress={() => navigation.navigate(RouteNames.auth.register.nutri)}
        label="Clique aqui para ir até a rota de testes"
      />
    </PageWrapper>
  );
}
