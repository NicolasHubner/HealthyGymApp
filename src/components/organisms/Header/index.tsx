import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { RootState } from '@/store';
import { INavigation } from '@/helpers/interfaces/INavigation';

import { RouteNames } from '@/routes/routes_names';

import AvatarImage from '@/assets/Avatar.png';

import {
    CircleProfileLogo,
    Container,
    DateText,
    HomeTitleContainer,
    ProfileContainer,
    ProfileLogo,
    WelcomeText,
} from './styles';
import { useCallback } from 'react';

export function Header() {
    const { name, email } = useSelector((state: RootState) => state.user);

    const { navigate } = useNavigation<INavigation>();

    const formattedDate = useCallback((date: Date) => {
        const weekDay = format(date, 'EEEEEE', { locale: ptBR });
        const day = format(date, 'dd', { locale: ptBR });
        const month = format(date, 'MMM', { locale: ptBR });

        return `${weekDay}, ${day} de ${month}`.toUpperCase();
    }, []);

    return (
        <Container>
            <HomeTitleContainer>
                <DateText>{formattedDate(new Date())}</DateText>
                <WelcomeText numberOfLines={1}>Oi, {name ?? email}</WelcomeText>
            </HomeTitleContainer>
            <ProfileContainer onPress={() => navigate(RouteNames.logged.notification)}>
                <ProfileLogo source={AvatarImage} />
                <CircleProfileLogo />
            </ProfileContainer>
        </Container>
    );
}
