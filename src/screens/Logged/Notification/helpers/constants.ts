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
            },
            // {
            //     id: 2,
            //     name: 'Seu horários =)',
            //     description: 'Vamos definir os horários de treinamento, água e alimentação',
            //     iconName: 'clock',
            //     typeIcon: 'Entypo',
            //     bgColor: '#AFD5F0',
            //     route: RouteNames.logged.timeNotification,
            // },
            {
                id: 3,
                name: 'Alterar foto de perfil',
                description: 'Adicionar ou alterar sua foto de perfil',
                iconName: 'user',
                typeIcon: 'Entypo',
                bgColor: '#F9C270',
                route: RouteNames.logged.userPhotos,
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
            },
        ],
    },
];
