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

interface UserProfile {
    photo?: {
        formats: {
            thumbnail?: {
                url?: string;
            };
        };
    };
}

export interface StudentDetails {
    notions: any;
    id?: number | string;
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
    gender?: string | null;
    isUsingApp?: boolean;
    isVerified?: boolean;
    imageProfile?: string | null;
    comments?: {
        id?: string;
        comment?: string;
        createdAt?: string;
    }[];
}

export interface UserDetails {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    name: string;
    birthdate: string; // You can use the 'Date' type if dates are manipulated in the code.
    gender: string;
    isUsingApp?: boolean; // Using this property to check if the user is using the app or not.
    weight: number;
    height: number;
    createdAt: string; // Again, use 'Date' type if dates are manipulated.
    updatedAt: string;
    goal_type: string;
    phone: string;
    user_profile: UserProfile;
    is_coach: boolean | null; // It seems this property might be boolean or null.
    show_user_navigation_to_coach: boolean | null; // It seems this property might be boolean or null.
}
