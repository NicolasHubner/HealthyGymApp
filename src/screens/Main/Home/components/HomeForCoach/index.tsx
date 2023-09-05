import React from 'react';

import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';
import { coachNavigationHomeOptions } from '@/helpers/constants/navigationApp';

export function HomeOptionsForCoach() {
    return (
        <>
            {coachNavigationHomeOptions.map(item => (
                <CardNavigationApp
                    key={item.id}
                    title={item.title}
                    iconName={item.icon}
                    typeIcon={item.typeIcon}
                    route={item.screen}
                />
            ))}
        </>
    );
}
