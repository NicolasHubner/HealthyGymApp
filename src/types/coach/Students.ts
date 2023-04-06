import { UserMetrics } from '../metrics/MetricsGeneral';
import { UserFromApi } from '../user';

export interface CoachStudentsResponse {
    data: {
        id: number;
        attributes: {
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            coach: {
                data: {
                    id: number;
                    attributes: UserFromApi;
                };
            };
            user: {
                data: {
                    id: number;
                    attributes: UserFromApi;
                };
            };
        };
    }[];
}

export interface StudentDetails {
    id?: number;
    email?: string;
    name?: string | null;
    registerId?: string;
    weight?: number | null;
    height?: number | null;
    engagement?: 'low' | 'medium' | 'high';
    supplement?: boolean;
    monthlyFeeStatus?: 'unpaid' | 'overdue' | 'paid';
    objective?: string | null;
    blocked?: boolean;
    level?: number;
    metrics?: UserMetrics;
    phone?: string | null;
    comments?: {
        id?: string;
        comment?: string;
        createdAt?: string;
    }[];
}
