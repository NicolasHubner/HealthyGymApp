import React from 'react';

import { CardNavigationApp } from '@/components/molecules/CardNavigationApp';

import { normalUserNavigationHomeOptions } from '@/helpers/constants/navigationApp';
// import { RouteNames } from '@/routes/routes_names';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export function HomeOptionsForNormalUser() {
    const { email } = useSelector((state: RootState) => state.user);

    // const newArrayUser = normalUserNavigationHomeOptions.map(item => {
    //     if (item.title === 'Avaliação') {
    //         return {
    //             ...item,
    //             screen:
    //                 (RouteNames.logged.fineshape.result,
    //                 {
    //                     params: {
    //                         email: email,
    //                     },
    //                 }),
    //         };
    //     }
    //     return item;
    // });
    // if (!newArrayUser) return <></>;
    // console.log(newArrayUser);
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
