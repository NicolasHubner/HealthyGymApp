import { RouteNames } from '@/routes/routes_names';

import { lightTheme } from '@/styles/theme';

const { colors } = lightTheme;

export const navigationApps = [
    {
        id: 1,
        title: 'Fotos',
        icon: 'camera',
        typeIcon: 'FontAwesome',
        color: colors.green[500],
        size: 80,
        screen: 'Home',
    },
    {
        id: 2,
        title: 'Explorar',
        icon: 'heartbeat',
        typeIcon: 'FontAwesome',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.explorer,
    },
    {
        id: 3,
        title: 'Treinos',
        icon: 'walking',
        typeIcon: 'FontAwesome5',
        color: colors.green[500],
        size: 80,
        screen: 'Home',
    },
    {
        id: 4,
        title: 'Água',
        icon: 'water',
        typeIcon: 'Ionicons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.water,
    },
    {
        id: 5,
        title: 'Nutrição',
        icon: 'food-apple',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.food.daily,
    },
    {
        id: 6,
        title: 'Métricas',
        icon: 'google-analytics',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.metrics,
    },
    {
        id: 7,
        title: 'Peso',
        icon: 'weight',
        typeIcon: 'FontAwesome5',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.measures,
    },
    {
        id: 8,
        title: 'Medalhas',
        icon: 'medal-outline',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: 'Home',
    },
    {
        id: 9,
        title: 'Sono',
        icon: 'sleep',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.sleep,
    },
];
