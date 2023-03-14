import React, { useState } from 'react';

import { DividerComponent } from '@/components/atoms/Divider';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import CardWarnings from '@/components/molecules/CardWarnings';
import { Header } from '@/components/organisms/Header';

import { TitleNavigationApp, TitleNavigationContainer } from './styles';
import { HomeOptionsForCoach } from './components/HomeForCoach';
import { HomeOptionsForNormalUser } from './components/HomeForUser';
import { Button } from 'react-native';
import { RouteNames } from '@/routes/routes_names';
import { useNavigation } from '@react-navigation/native';
import { INavigation } from '@/helpers/interfaces/INavigation';

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
    const [userRole, setUserRole] = useState<'user' | 'coach'>('coach');

    const { navigate } = useNavigation<INavigation>();

    const rotaDeTestes = RouteNames.logged.coach.studentDetails;
    return (
        <ScrollablePageWrapper bottomSpacing>
            <Header />

            <Button title={`Ir até ${rotaDeTestes}`} onPress={() => navigate(rotaDeTestes)} />

            <CardWarnings
                textSubTitle={cardWarningsPattern[userRole].title}
                textSubtitleBody={cardWarningsPattern[userRole].text}
                textSeeMore={cardWarningsPattern[userRole].button}
            />
            <DividerComponent />

            <TitleNavigationContainer>
                <TitleNavigationApp>Navegue pelo seu app</TitleNavigationApp>

                <Button
                    title={`Cargo atual: ${userRole}`}
                    onPress={() => setUserRole(current => (current === 'coach' ? 'user' : 'coach'))}
                />
            </TitleNavigationContainer>

            {userRole === 'coach' ? <HomeOptionsForCoach /> : <HomeOptionsForNormalUser />}
        </ScrollablePageWrapper>
    );
}
