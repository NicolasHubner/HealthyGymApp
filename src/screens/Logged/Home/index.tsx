import React from 'react';
import { PageWrapper } from '@/components/molecules/ScreenWrapper';
import {
  CardsContainer,
  CircleProfileLogo,
  ContinaerTitle,
  DateText,
  HomeTitleContainer,
  ProfileContainer,
  ProfileLogo,
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
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Home() {
  const navigator = useNavigation() as INavigation;

  const formattedDate = (date: Date) => {
    const weekDay = format(date, 'EEEEEE', { locale: ptBR });
    const day = format(date, 'LL', { locale: ptBR });
    const month = format(date, 'LLL', { locale: ptBR });

    return `${weekDay}, ${day} de ${month}`.toUpperCase();
  };

  const { name, email } = useSelector((state: RootState) => state.user);

  return (
    <PageWrapper>
      <ContinaerTitle>
        <HomeTitleContainer>
          <DateText>{formattedDate(new Date())}</DateText>
          <WelcomeText numberOfLines={1}>Oi, {name ?? email}</WelcomeText>
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
