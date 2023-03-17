import { RouteNames } from '@/routes/routes_names';

import { User } from '@/types/user';

interface CardProps {
    id: string;
    api: keyof User['metrics'] | any;
    color: string;
    title: string;
    atts: string;
    atributes?: string;
    attTime: string;
    routes: string;
}

export const cards: CardProps[] = [
    {
        id: 'calories',
        api: 'caloriesConsumedToday',
        color: '#90D692',
        title: 'Calorias',
        atts: '500',
        atributes: 'kcal',
        attTime: '3d',
        routes: RouteNames.logged.calories,
    },
    {
        id: 'weight',
        api: 'weight',
        color: '#589A5A',
        title: 'Peso',
        atts: '58',
        atributes: 'kg',
        attTime: '3d',
        routes: RouteNames.logged.measures,
    },
    {
        id: 'water',
        api: 'waterDrinkedToday',
        color: '#1F87FE',
        title: 'Água',
        atts: '750',
        atributes: 'ml',
        attTime: '2h',
        routes: RouteNames.logged.water,
    },
    {
        id: 'trains',
        api: 'trainPercentage',
        color: '#4C5980',
        title: 'Treinos',
        atts: '42%',
        attTime: '1d',
        atributes: '%',
        routes: RouteNames.logged.metrics.train,
    },
];

export const renderCardValue = (id: string, value: number | string) => {
    switch (id) {
        case 'water':
            if (Number(value) >= 1000) {
                return `${(Number(value) / 1000).toFixed(1)}`;
            }
            return `${value}`;

        default:
            return `${value}`;
    }
};
