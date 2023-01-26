import React, { useState } from 'react';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import {
  CardsContainer,
  CircleProfileLogo,
  ContainerStyle,
  ContinaerTitle,
  DateText,
  HomeTitleContainer,
  ProfileContainer,
  ProfileLogo,
  TextSeeMore,
  TextSubTitle,
  TextSubtitleBody,
  TitleNavigationApp,
  TitleNavigationContainer,
  WelcomeText,
} from './style';
import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { navigationApps } from '@/helpers/constants/navigationApp';
import AvatarImage from '@/assets/Avatar.png';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { RouteNames } from '@/routes/routes_names';
import { DividerComponent } from '@/components/atoms/Divider';
import CardWarnings from '@/components/molecules/CardWarnings';

export function Home() {
  const navigator = useNavigation() as INavigation;
  const [date, setDate] = useState<string>('TER 13 OUT');
  const [welcome, setWelcome] = useState<string>('Carla');
  return (
    <PageWrapper>
      <ContinaerTitle>
        <HomeTitleContainer>
          <DateText>{date}</DateText>
          <WelcomeText>Oi, {welcome}</WelcomeText>
        </HomeTitleContainer>
        <ProfileContainer onPress={() => navigator.navigate(RouteNames.logged.notification)}>
          <ProfileLogo source={AvatarImage} />
          <CircleProfileLogo />
        </ProfileContainer>
      </ContinaerTitle>
      <CardWarnings
        textSubTitle={'Este é seu estilo'}
        textSubtitleBody={
          'Aqui você consegue gerenciar, editar e visualizar toda sua rotina de treino.'
        }
        textSeeMore={'Ver mais'}
      />
      <DividerComponent />
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
