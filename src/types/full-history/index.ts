import { UserFromApi } from '../user';

interface Food {
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    preparation_method: string;
    title: string;
    time: number;
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    goal_type: string;
    gender: string;
}

export interface FullHistoryResponse {
    user: UserFromApi;
    'food-history': {
        id: number;
        datetime: string;
        createdAt: string;
        updatedAt: string;
        food: Food;
    }[];
    'water-history': {
        id: number;
        datetime: string;
        amount: number;
        createdAt: string;
        updatedAt: string;
    }[];
    'weight-history': {
        id: number;
        datetime: string;
        weight: number;
        createdAt: string;
        updatedAt: string;
    }[];
    'workout-history': {
        id: number;
        datetime: string;
        createdAt: string;
        updatedAt: string;
    }[];
}
