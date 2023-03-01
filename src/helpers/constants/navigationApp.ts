import { RouteNames } from '@/routes/routes_names';

import { lightTheme } from '@/styles/theme';

const { colors } = lightTheme;

export const normalUserNavigationHomeOptions = [
    {
        id: 1,
        title: 'Fotos',
        icon: 'camera',
        typeIcon: 'FontAwesome',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.home,
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
        screen: RouteNames.logged.home,
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
        screen: RouteNames.logged.metrics.initial,
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
        screen: RouteNames.logged.home,
    },
    {
        id: 9,
        title: 'Sono',
        icon: 'sleep',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.trainDays,
    },
];

export const coachNavigationHomeOptions = [
    {
        id: 1,
        title: 'Vendas',
        icon: 'dollar',
        typeIcon: 'Fontisto',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.home,
    },
    {
        id: 2,
        title: 'Revenda',
        icon: 'cart-arrow-right',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.home,
    },
    {
        id: 3,
        title: 'Retenção',
        icon: 'store',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.home,
    },
    {
        id: 4,
        title: 'Alunos',
        icon: 'running',
        typeIcon: 'FontAwesome5',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.coach.students,
    },
    {
        id: 5,
        title: 'Suplementos',
        icon: 'blender',
        typeIcon: 'MaterialCommunityIcons',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.home,
    },
    {
        id: 6,
        title: 'Avaliação',
        icon: 'bar-graph',
        typeIcon: 'Entypo',
        color: colors.green[500],
        size: 80,
        screen: RouteNames.logged.home,
    },
];
