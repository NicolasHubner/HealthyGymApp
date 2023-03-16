import { RouteNames } from '@/routes/routes_names';

interface CardProps {
    id: string;
    api: string;
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
        api: 'workout',
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
        api: 'water',
        color: '#1F87FE',
        title: 'Água',
        atts: '750',
        atributes: 'ml',
        attTime: '2h',
        routes: RouteNames.logged.water,
    },
    {
        id: 'trains',
        api: 'workout',
        color: '#4C5980',
        title: 'Treinos',
        atts: '42%',
        attTime: '1d',
        routes: RouteNames.logged.metrics.train,
    },
];
