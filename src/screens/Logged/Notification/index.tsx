import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { useState } from 'react';
import {
  CardSubTitle,
  CardTextContainer,
  CardTitle,
  ContainerNotification,
  SubTitleContainer,
  IconNumberNotification,
  IconText,
  NotifcationCard,
  SubTitle,
  TitleContainer,
  TitleScreen,
} from './style';
import Avatar from '@/assets/Avatar.png';
import { useTheme } from 'styled-components';
import { RouteNames } from '@/routes/routes_names';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { useNavigation } from '@react-navigation/native';

interface INotification {
  id: number;
  name: string;
  description: string;
  iconName?: string;
  typeIcon?: string;
  route?: string;
  bgColor?: string;
  source?: any;
}

export default function Notification() {
  const { colors } = useTheme();
  const navigator = useNavigation() as INavigation;
  const [numberNotification, setNumberNotification] = useState(3);
  const [notification, setNotification] = useState<INotification[]>([
    {
      id: 1,
      name: 'Clar Medinaa',
      description: 'Adicionou você como amigo',
      source: Avatar,
      // route: 'Profile',
    },
    {
      id: 2,
      name: 'Vamos fazer suas fotos',
      description: 'Com essas fotos conseguiremos ver sua evolução',
      iconName: 'camera',
      typeIcon: 'Entypo',
      bgColor: '#FD5977',
      route: RouteNames.logged.photos,
    },
  ]);
  const [notificationPastWeek, setNotificationPast] = useState<INotification[]>([
    {
      id: 1,
      name: 'Meta diária',
      description: 'Parabéns, você atingiu sua meta diária',
      iconName: 'walking',
      typeIcon: 'FontAwesome5',
      bgColor: colors.green[500],
    },
    {
      id: 2,
      name: 'Conquista',
      description: 'Você é o primeiro entre seus amigos',
      bgColor: '#FE971F',
      iconName: 'trophy',
      typeIcon: 'FontAwesome5',
    },
    {
      id: 3,
      name: 'Nutrição',
      description: 'Seu café da manhã tem muitas calorias',
      bgColor: '#FD5977',
      iconName: 'food-apple',
      typeIcon: 'MaterialCommunityIcons',
    },
  ]);

  return (
    <ScrollablePageWrapper>
      <TitleContainer>
        <TitleScreen>Notificação</TitleScreen>
      </TitleContainer>
      <SubTitleContainer>
        <SubTitle>Mais cedo</SubTitle>
        <IconNumberNotification>
          <IconText>+{numberNotification}</IconText>
        </IconNumberNotification>
      </SubTitleContainer>
      <ContainerNotification>
        {notification.map(item => (
          <NotifcationCard
            onPress={() => {
              if (item.route) {
                navigator.navigate(item.route);
              }
            }}
            key={item.id}>
            <CardNavigationApp
              route={item.route}
              iconName={item.iconName}
              typeIcon={item.typeIcon}
              bgColor={item.bgColor}
              width33={false}
              mgTop={0}
              size={54}
              source={item.source}
            />
            <CardTextContainer>
              <CardTitle>{item.name}</CardTitle>
              <CardSubTitle>{item.description}</CardSubTitle>
            </CardTextContainer>
          </NotifcationCard>
        ))}
      </ContainerNotification>
      <SubTitleContainer>
        <SubTitle>Semana Anterior</SubTitle>
      </SubTitleContainer>
      <ContainerNotification>
        {notificationPastWeek.map(item => (
          <NotifcationCard key={item.id}>
            <CardNavigationApp
              width33={false}
              iconName={item.iconName}
              typeIcon={item.typeIcon}
              bgColor={item.bgColor}
              mgTop={0}
              route={item.route ? item.route : ''}
              size={54}
              source={item.source}
            />
            <CardTextContainer>
              <CardTitle>{item.name}</CardTitle>
              <CardSubTitle>{item.description}</CardSubTitle>
            </CardTextContainer>
          </NotifcationCard>
        ))}
      </ContainerNotification>
    </ScrollablePageWrapper>
  );
}
