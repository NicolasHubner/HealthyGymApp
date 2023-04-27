import { UserFromApi } from '../user';

export interface FullHistoryResponse {
    user: UserFromApi;
    'food-history': {
        id: number;
        datetime: string;
        createdAt: string;
        updatedAt: string;
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
