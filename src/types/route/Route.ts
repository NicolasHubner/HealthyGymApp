import { ICardsStudents } from '@/screens/Main/SuplementsToStudents/components/RenderCardStudent';

export interface Route {
    params: {};
    key: string;
    name: string;
}

export interface SuplementsRoute extends Route {
    params: {
        dataSuplement: {
            name: string;
            image: string;
        };
        dataStudent: ICardsStudents;
        quantity: number;
    };
}
