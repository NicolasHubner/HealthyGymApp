import { RouteNames } from '@/routes/routes_names';

interface CardProps {
    color: string;
    title: string;
    atts: string;
    atributes?: string;
    attTime: string;
    routes: string;
    params?: {
        from: string;
    };
}

export const cards: CardProps[] = [
    {
        color: '#90D692',
        title: 'Calorias',
        atts: '500',
        atributes: 'kcal',
        attTime: '3d',
        routes: RouteNames.logged.calories,
        params: {
            from: 'metrics',
        },
    },
    {
        color: '#589A5A',
        title: 'Peso',
        atts: '58',
        atributes: 'kg',
        attTime: '3d',
        routes: RouteNames.logged.measures,
    },
    {
        color: '#1F87FE',
        title: 'Água',
        atts: '750',
        atributes: 'ml',
        attTime: '2h',
        routes: RouteNames.logged.water,
    },
    {
        color: '#4C5980',
        title: 'Treinos',
        atts: '42%',
        attTime: '1d',
        routes: RouteNames.logged.metrics.train,
    },
];
