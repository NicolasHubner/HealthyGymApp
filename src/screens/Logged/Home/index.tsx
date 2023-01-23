import React, { useState } from 'react';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import {
  CardsContainer,
  ContainerStyle,
  DateText,
  Divider,
  HomeTitleContainer,
  TextSeeMore,
  TextSubTitle,
  TextSubtitleBody,
  TitleNavigationApp,
  TitleNavigationContainer,
  WelcomeText,
} from './style';
import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { navigationApps } from '@/helpers/constants/navigationApp';

export function Home() {
  const [date, setDate] = useState<string>('TER 13 OUT');
  const [welcome, setWelcome] = useState<string>('Carla');
  return (
    <PageWrapper>
      <HomeTitleContainer>
        <DateText>{date}</DateText>
        <WelcomeText>Oi, {welcome}</WelcomeText>
      </HomeTitleContainer>
      <ContainerStyle>
        <TextSubTitle>Este é seu estilo</TextSubTitle>
        <TextSubtitleBody>
          Aqui você consegue gerenciar, editar e visualizar toda sua rotina de treino.
        </TextSubtitleBody>
        <TextSeeMore
          onPress={() => {
            console.log('Ver mais');
          }}>
          Ver mais
        </TextSeeMore>
      </ContainerStyle>
      <Divider />
      <TitleNavigationContainer>
        <TitleNavigationApp>Navegue pelo seu app</TitleNavigationApp>
      </TitleNavigationContainer>
      <CardsContainer>
        {navigationApps.map(item => (
          <CardNavigationApp
            key={item.id}
            title={item.title}
            iconName={item.icon}
            size={item.size}
            typeIcon={item.typeIcon}
            route={item.screen}
          />
        ))}
      </CardsContainer>
    </PageWrapper>
  );
}
