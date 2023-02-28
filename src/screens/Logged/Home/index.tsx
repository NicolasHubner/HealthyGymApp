import React, { useState } from 'react';

import { DividerComponent } from '@/components/atoms/Divider';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import CardWarnings from '@/components/molecules/CardWarnings';
import { Header } from '@/components/organisms/Header';

import { TitleNavigationApp, TitleNavigationContainer } from './styles';
import { HomeOptionsForCoach } from './components/HomeForCoach';
import { HomeOptionsForNormalUser } from './components/HomeForUser';
import { Button } from 'react-native';

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
