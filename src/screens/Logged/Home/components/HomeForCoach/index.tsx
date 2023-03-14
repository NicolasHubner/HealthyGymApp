import React from 'react';

import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { coachNavigationHomeOptions } from '@/helpers/constants/navigationApp';

import { CardsContainer } from './styles';

export function HomeOptionsForCoach() {
    return (
        <CardsContainer>
            {coachNavigationHomeOptions.map(item => (
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
    );
}
