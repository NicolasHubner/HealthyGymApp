import React from 'react';

import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';

import { normalUserNavigationHomeOptions } from '@/helpers/constants/navigationApp';

export function HomeOptionsForNormalUser() {
    return (
        <>
            {normalUserNavigationHomeOptions.map(item => (
                <CardNavigationApp
                    key={item.id}
                    title={item.title}
                    iconName={item.icon}
                    size={item.size}
                    typeIcon={item.typeIcon}
                    route={item.screen}
                />
            ))}
        </>
    );
}
