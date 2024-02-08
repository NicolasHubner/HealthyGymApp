import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HomeOptionsForCoach } from './components/HomeForCoach';
import { HomeOptionsForNormalUser } from './components/HomeForUser';
import { DividerComponent } from '@/components/atoms/Divider';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import CardWarnings from '@/components/molecules/CardWarnings';
import { Header } from '@/components/organisms/Header';

import { RootState } from '@/store';

import { OptionsContainer, TitleNavigationApp, TitleNavigationContainer } from './styles';
import { generateAuthHeaders } from '@/utils/generateAuthHeaders';
import { sentPhotos } from './helpers/sentPhotos';
import { FoodsNotification } from '@/helpers/functions/notifications';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { WaterNotification } from '@/helpers/functions/notifications/water';

import { TrainNotification } from '@/helpers/functions/notifications/train';
import { HandlersNotifee } from '@/helpers/functions/notifications/handlers';
import { GettingPhotos } from './helpers/getPhotos';
import notifee from '@notifee/react-native';
import { api } from '@/services/api';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { Skeleton } from '@/components/atoms/Skeleton';
import { HistoricAvaliation } from './components/AvaliationHistoric';
import CardNoAvaliation from './components/CardNoAvaliation';
// import { CreatTimer12Days } from '../FineShape/screens/Question/helpers/createTimer';

const cardWarningsPattern = {
    user: {
        title: 'Este é seu estilo',
        text: 'Aqui você consegue gerenciar, editar e visualizar toda sua rotina de treino.',
        button: 'Ver mais',
    },
    coach: {
        title: 'Seu painel administrativo',
        text: 'Aqui você consegue gerenciar, editar e visualizar toda sua rotina adm e comerciais',
        button: 'Ver mais',
    },
};

export function Home() {
    const [userRole, setUserRole] = useState<'user' | 'coach'>('user');
    const [homeOptions, setHomeOptions] = useState<'user' | 'coach'>('user');
    const navigate = useNavigation() as INavigation;

    const [userAvaliation, setUserAvaliation] = useState<FineShapeFromApi>({} as FineShapeFromApi);

    const { isCoach, token, goal_type, id, imageProfile, email } = useSelector(
        (state: RootState) => state.user
    );
    const headers = generateAuthHeaders(token!);

    const [loading, setLodingPhoto] = useState(true);

    const [loadingAvaliation, setLoadingAvaliation] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isCoach && userRole === 'user') {
            setUserRole('coach');
            setHomeOptions('coach');
            return;
        }

        if (userRole === 'coach') setUserRole('user');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCoach]);

    useEffect(() => {
        sentPhotos({ headers });
    }, [headers]);

    useFocusEffect(
        useCallback(() => {
            GettingPhotos({ headers, id, dispatch, setLodingPhoto });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    useEffect(() => {
        if (isCoach) {
            (async () => {
                await notifee.requestPermission();
            })();
        }

        if (!isCoach) {
            const handlers = async () => {
                await Promise.all([
                    FoodsNotification({
                        goal_type: goal_type || '',
                        navigate: navigate,
                    }).getLunchReminder(),
                    WaterNotification({ navigate }).verifyIfWaterReminderIsSet(),
                    TrainNotification().verifyIfTrainReminderIsSet(),
                ]);

                await HandlersNotifee({ navigate });
            };
            handlers();
        }
    }, [navigate, goal_type, isCoach]);

    const getLastAvaliation = useCallback(async () => {
        try {
            const { data } = await api.get(
                `/fine-shapes?populate=coach&filters[email]=${email?.toLowerCase()}&sort=createdAt:desc&pagination[limit]=1`,
                {
                    headers,
                }
            );
            if (data.data.length === 0) return;
            setUserAvaliation(data.data[0].attributes);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAvaliation(false);
        }
    }, [email, headers]);

    useEffect(() => {
        if (isCoach) return;

        getLastAvaliation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCoach]);

    return (
        <ScrollablePageWrapper bottomSpacing>
            <Header imageProfile={imageProfile || ''} loading={loading} />

            {isCoach && (
                <>
                    <CardWarnings
                        textSubTitle={cardWarningsPattern[userRole].title}
                        textSubtitleBody={cardWarningsPattern[userRole].text}
                        textSeeMore={cardWarningsPattern[userRole].button}
                    />

                    <DividerComponent />
                </>
            )}

            {!isCoach && loadingAvaliation && (
                <Skeleton height={150} marginTop={8} borderRadius={12} width={'96%'} />
            )}

            {!isCoach && !loadingAvaliation && userAvaliation.name && (
                <HistoricAvaliation data={userAvaliation} />
            )}

            {!isCoach && !loadingAvaliation && !userAvaliation.name && <CardNoAvaliation />}
            <TitleNavigationContainer>
                <TitleNavigationApp>Navegue pelo app</TitleNavigationApp>
            </TitleNavigationContainer>

            <OptionsContainer style={{ rowGap: 16 }}>
                {homeOptions === 'coach' ? <HomeOptionsForCoach /> : <HomeOptionsForNormalUser />}
            </OptionsContainer>
        </ScrollablePageWrapper>
    );
}
