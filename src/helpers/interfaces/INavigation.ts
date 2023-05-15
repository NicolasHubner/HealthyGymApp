import { IFood } from './../../screens/Logged/Food/Daily/helpers/functions';
import { INutrients } from '@/screens/Logged/Food/Details';

export interface IParams {
    screen?: string;
    email?: string;
    from?: string;
    food?: INutrients;
    data?: IFood;
}

export interface INavigation {
    [x: string]: any;
    reset(): unknown;
    goBack(): void;
    canGoBack(): boolean;
    navigate: (pathd: string, params?: IParams) => void;
    setOptions: (options: any) => void;
}

export interface FineShapeScreenNavigation {
    [x: string]: any;
    reset(): unknown;
    goBack(): void;
    canGoBack(): boolean;
    navigate: (pathd: string, params?: any) => void;
    setOptions: (options: any) => void;
}
