import { ApiPaginationResponse } from '../pagination/Pagination';

export interface EvolutionPhotoHistory {
    id?: number | null;
    attributes?: {
        datetime?: string | null;
        side_photo?: string | null;
        front_photo?: string | null;
        back_photo?: string | null;
        createdAt?: string | null;
        updatedAt?: string | null;
        publishedAt?: string | null;
        user?: {
            data?: {
                id?: number | null;
                attributes?: {
                    username?: string | null;
                    email?: string | null;
                    provider?: string | null;
                    confirmed?: boolean | null;
                    blocked?: boolean | null;
                    name?: string | null;
                    birthdate?: string | null;
                    gender?: string | null;
                    weight?: number | null;
                    height?: number | null;
                    createdAt?: string | null;
                    updatedAt?: string | null;
                    goal_type?: string | null;
                    phone?: string | null;
                    is_coach?: boolean | null;
                };
            };
        };
    };
}

export interface EvolutionPhotoHistoryResponse {
    data?: EvolutionPhotoHistory[];
    meta?: ApiPaginationResponse;
}
