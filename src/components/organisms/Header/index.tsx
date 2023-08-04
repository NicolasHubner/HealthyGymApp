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
    ProfileContainer,
    ProfileLogo,
    WelcomeText,
} from './styles';
import { useCallback, useEffect, useState } from 'react';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { api } from '@/services/api';
import { DataPhotos } from '@/screens/Logged/UserPhoto';
import { setUserInfo } from '@/store/user';

export function Header() {
    const { name, email, token, id } = useSelector((state: RootState) => state.user);

    const dispatch = useDispatch();

    const { navigate } = useNavigation<INavigation>();

    const [photos, setPhotos] = useState<string | null>(null);

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

    const getPhotoUser = useCallback(async () => {
        const headers = generateAuthHeaders(token!);
        try {
            const response = await api.get(
                `/user-profiles?populate=photo&filters[user][id][$eq]=${id}&sort=datetime:DESC`,
                {
                    headers,
                }
            );

            const data: DataPhotos = response.data;
            if (data.data.length > 0) {
                const url = data.data[0].attributes.photo.data.attributes.url;
                setPhotos(url);
            }

            dispatch(setUserInfo({ imageProfile: photos }));

            return;
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, id, photos, token]);

    useEffect(() => {
        getPhotoUser();
    }, [getPhotoUser]);

    return (
        <Container>
            <HomeTitleContainer>
                <DateText>{formattedDate(new Date())}</DateText>
                <WelcomeText numberOfLines={1}>{renderUserName(name, email)}</WelcomeText>
            </HomeTitleContainer>
            <ProfileContainer onPress={() => navigate(RouteNames.logged.notification)}>
                <ProfileLogo source={!photos ? AvatarImage : { uri: photos }} />
                {/* <CircleProfileLogo /> */}
            </ProfileContainer>
        </Container>
    );
}
