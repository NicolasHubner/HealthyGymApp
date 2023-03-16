import { INutrients } from '@/screens/Logged/Food/Details';

export interface IParams {
    screen?: string;
    email?: string;
    from?: string;
    food?: INutrients;
}

export interface INavigation {
    [x: string]: any;
    reset(): unknown;
    goBack(): void;
    canGoBack(): boolean;
    navigate: (pathd: string, params?: IParams) => void;
    setOptions: (options: any) => void;
}
