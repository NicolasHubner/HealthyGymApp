import { RouteNames } from '@/routes/routes_names';

export const Notifications = [
    {
        type: false,
        data: [
            {
                id: 1,
                name: 'Vamos fazer suas fotos',
                description: 'Com essas fotos conseguiremos ver sua evolução',
                iconName: 'camera',
                typeIcon: 'Entypo',
                bgColor: '#FD5977',
                route: RouteNames.logged.photos,
                notification: 0,
            },
            {
                id: 3,
                name: 'Alterar foto de perfil',
                description: 'Adicionar ou alterar sua foto de perfil',
                iconName: 'user',
                typeIcon: 'Entypo',
                bgColor: '#F9C270',
                route: RouteNames.logged.userPhotos,
                notification: 0,
            },
        ],
    },
    {
        type: true,
        data: [
            {
                id: 1,
                name: 'Alterar foto de perfil',
                description: 'Adicionar ou alterar sua foto de perfil',
                iconName: 'user',
                typeIcon: 'Entypo',
                bgColor: '#F9C270',
                route: RouteNames.logged.userPhotos,
                notification: 0,
            },
        ],
    },
];
