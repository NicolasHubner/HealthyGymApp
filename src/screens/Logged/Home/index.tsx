import React from 'react';

import { DividerComponent } from '@/components/atoms/Divider';
import { ScrollablePageWrapper } from '@/components/molecules/ScreenWrapper';
import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import CardWarnings from '@/components/molecules/CardWarnings';
import { Header } from '@/components/organisms/Header';
import { navigationApps } from '@/helpers/constants/navigationApp';

import { CardsContainer, TitleNavigationApp, TitleNavigationContainer } from './style';

export function Home() {
    return (
        <ScrollablePageWrapper bottomSpacing>
            <Header />
            <CardWarnings
                textSubTitle={'Este é seu estilo'}
                textSubtitleBody={
                    'Aqui você consegue gerenciar, editar e visualizar toda sua rotina de treino.'
                }
                textSeeMore={'Ver mais'}
            />
            <DividerComponent />
            <TitleNavigationContainer>
                <TitleNavigationApp>Navegue pelo seu app</TitleNavigationApp>
            </TitleNavigationContainer>
            <CardsContainer>
                {navigationApps.map(item => (
                    <CardNavigationApp
                        key={item.id}
                        title={item.title}
                        iconName={item.icon}
                        size={item.size}
                        typeIcon={item.typeIcon}
                        route={item.screen}
                    />
                ))}
            </CardsContainer>
        </ScrollablePageWrapper>
    );
}
