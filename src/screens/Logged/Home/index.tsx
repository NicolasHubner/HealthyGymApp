import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';
import { WaterNotification } from '@/helpers/functions/notifications/water';

import { TrainNotification } from '@/helpers/functions/notifications/train';
import { HandlersNotifee } from '@/helpers/functions/notifications/handlers';

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

    const { isCoach, token, goal_type } = useSelector((state: RootState) => state.user);
    const headers = generateAuthHeaders(token!);

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

    // useEffect(() => {
    //     HandlersNotifee({ navigate });
    // }, [goal_type, navigate]);

    useEffect(() => {
        const handlers = async () => {
            await Promise.all([
                FoodsNotification({
                    goal_type: goal_type || '',
                    navigate: navigate,
                }).getLunchReminder(),
                WaterNotification({ navigate }).verifyIfWaterReminderIsSet(),
                TrainNotification({ navigate }).verifyIfTrainReminderIsSet(),
            ]);

            await HandlersNotifee({ navigate });
        };
        handlers();
    }, [navigate, goal_type]);


    return (
        <ScrollablePageWrapper bottomSpacing>
            <Header />

            <CardWarnings
                textSubTitle={cardWarningsPattern[userRole].title}
                textSubtitleBody={cardWarningsPattern[userRole].text}
                textSeeMore={cardWarningsPattern[userRole].button}
            />
            <DividerComponent />

            <TitleNavigationContainer>
                <TitleNavigationApp>Navegue pelo app</TitleNavigationApp>
            </TitleNavigationContainer>

            <OptionsContainer style={{ rowGap: 16 }}>
                {homeOptions === 'coach' ? <HomeOptionsForCoach /> : <HomeOptionsForNormalUser />}
            </OptionsContainer>
        </ScrollablePageWrapper>
    );
}
