import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { RootState } from '@/store';
import { INavigation } from '@/helpers/interfaces/INavigation';

import { RouteNames } from '@/routes/routes_names';

import AvatarImage from '@/assets/no-user.jpg';

import {
    Container,
    DateText,
    HomeTitleContainer,
    ProfileContainer,
    ProfileLogo,
    WelcomeText,
} from './styles';
import { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';

export function Header({
    imageProfile: imageProfileProps,
    loading,
}: {
    imageProfile?: string;
    loading?: boolean;
}) {
    const { name, email } = useSelector((state: RootState) => state.user);

    const { navigate } = useNavigation<INavigation>();

    const formattedDate = useCallback((date: Date) => {
        const weekDay = format(date, 'EEEEEE', { locale: ptBR });
        const day = format(date, 'dd', { locale: ptBR });
        const month = format(date, 'MMM', { locale: ptBR });

        return `${weekDay}, ${day} de ${month}`.toUpperCase();
    }, []);

    const renderUserName = useCallback((userName?: string | null, userEmail?: string | null) => {
        if (userName) return `Oi, ${userName}`;
        if (userEmail) return `Oi, ${userEmail}`;
        return 'Oi.';
    }, []);

    return (
        <Container>
            <HomeTitleContainer>
                <DateText>{formattedDate(new Date())}</DateText>
                <WelcomeText numberOfLines={1}>{renderUserName(name, email)}</WelcomeText>
            </HomeTitleContainer>
            <ProfileContainer onPress={() => navigate(RouteNames.logged.notification)}>
                {loading && (
                    <ActivityIndicator
                        style={{ marginTop: 40, marginRight: 40 }}
                        size="small"
                        color="#000"
                    />
                )}
                {!loading && (
                    <ProfileLogo
                        source={!imageProfileProps ? AvatarImage : { uri: imageProfileProps }}
                    />
                )}
                {/* <CircleProfileLogo /> */}
            </ProfileContainer>
        </Container>
    );
}
