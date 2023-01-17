import React from "react";
import { Text } from "react-native";

import { PageWrapper } from "@/components/molecules/ScreenWrapper";

import onboardImg from "@/assets/onboard_01.png";
import { Logo } from "@/components/atoms/Logo";
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
} from "./styles";
import { Button } from "@/components/atoms/Button";
import { TextAsLink } from "@/components/atoms/TextAsLink";

export function RegisterSplash() {
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
        <Button label="Vamos começar" />
      </ButtonContainer>

      <LoginContainer>
        <LoginText>Ja tem uma conta?</LoginText>
        <TextAsLink label="Login" />
      </LoginContainer>
    </PageWrapper>
  );
}
