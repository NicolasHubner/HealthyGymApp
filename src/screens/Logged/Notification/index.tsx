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
  const [numberNotification, setNumberNotification] = useState(3);
  const [notification, setNotification] = useState<INotification[]>([
    {
      id: 1,
      name: 'João Pedro',
      description: 'Adicionou você como amigo',
      source: Avatar,
    },
    {
      id: 2,
      name: 'João Pedro',
      description: 'Adicionou você como amigo',
      source: Avatar,
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
          <NotifcationCard key={item.id}>
            <CardNavigationApp mgTop={0} size={54} source={item.source} />
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
              iconName={item.iconName}
              typeIcon={item.typeIcon}
              bgColor={item.bgColor}
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
    </ScrollablePageWrapper>
  );
}
