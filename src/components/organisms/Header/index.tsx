import { useDispatch, useSelector } from 'react-redux';
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
    NotifcationBadgeHome,
    ProfileContainer,
    ProfileLogo,
    WelcomeText,
} from './styles';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { api } from '@/services/api';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { setUserInfo } from '@/store/user';
import { Order } from '@/screens/Main/Notification/helpers/interfaces';

export function Header({
    imageProfile: imageProfileProps,
    loading,
}: {
    imageProfile?: string;
    loading?: boolean;
}) {
    const { name, email, token, id, suplements } = useSelector((state: RootState) => state.user);

    const { colors } = useTheme();

    const dispatch = useDispatch();

    // A ideia é que seja o estado para acumular todas as notificações de suplementos e outras que virão
    const [notificationNumber, setNotificationNumber] = useState(0);

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

    const getNotificationSuplement = useCallback(async () => {
        const header = generateAuthHeaders(token!);

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const formatteDate = thirtyDaysAgo.toISOString();

        const { data } = await api.get(
            `/suplement-histories?filters[User][id][$eq]=${id}&populate[Suplement][populate]=Image.media&filters[datetime][$gte]=${formatteDate}`,
            {
                headers: header,
            }
        );

        const suplementsOverData = data.data.filter((item: Order) => {
            const date = new Date(item.attributes.datetime);

            date.setDate(
                date.getDate() +
                    item.attributes.Suplement.data.attributes.Duration_days *
                        item.attributes.Quantity
            );

            return date.getTime() > new Date().getTime();
        });

        dispatch(setUserInfo({ suplements: suplementsOverData as Order[] }));

        setNotificationNumber(suplementsOverData.length);
    }, [dispatch, id, token]);

    useEffect(() => {
        getNotificationSuplement();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        color={colors.green[500]}
                    />
                )}
                {!loading && (
                    <>
                        <ProfileLogo
                            source={!imageProfileProps ? AvatarImage : { uri: imageProfileProps }}
                        />
                        {notificationNumber > 0 && (
                            <NotifcationBadgeHome>{notificationNumber}</NotifcationBadgeHome>
                        )}
                    </>
                )}
                {/* <CircleProfileLogo /> */}
            </ProfileContainer>
        </Container>
    );
}
