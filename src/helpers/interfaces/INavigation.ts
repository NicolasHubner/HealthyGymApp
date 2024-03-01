import { PickImageProps } from '@/screens/Main/PhotoPicks';
import { IFood } from '../../screens/Main/Food/Daily/helpers/functions';
import { INutrients } from '@/screens/Main/Food/Details';
import { FineShapeFromApi } from '@/types/fineshape/FineShape';
import { ICardsStudents } from '@/screens/Main/SuplementsToStudents/components/RenderCardStudent';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

interface DataSuplement {
    name: string;
    description?: string;
    image: string | null;
    price?: number;
    id?: number;
}

export interface IParams {
    screen?: string;
    email?: string;
    from?: string;
    food?: INutrients;
    data?: IFood | IFood[] | FineShapeFromApi;
    dataSuplement?: DataSuplement;
    dataStudent?: ICardsStudents | null;
    quantity?: number;
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
    setOptions: (options: NativeStackNavigationOptions) => void;
}

export interface FineShapeScreenNavigation {
    [x: string]: any;
    reset(): unknown;
    goBack(): void;
    canGoBack(): boolean;
    navigate: (pathd: string, params?: any) => void;
    setOptions: (options: any) => void;
}
