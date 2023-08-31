import { PickImageProps } from '@/screens/Logged/PhotoPicks';
import { IFood } from '../../screens/Logged/Food/Daily/helpers/functions';
import { INutrients } from '@/screens/Logged/Food/Details';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';

export interface IParams {
    screen?: string;
    email?: string;
    from?: string;
    food?: INutrients;
    data?: IFood | IFood[] | FineShapeFromApi;
    photoCoach?: string;
    title?: string;
    pickedImagePath?: PickImageProps;
    userIdParam?: number;
    height?: number;
    weight?: number;
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
