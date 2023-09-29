import { Order } from '@/screens/Main/Notification/helpers/interfaces';
import { UserMetrics, UserGoals } from '../metrics/MetricsGeneral';

export interface User {
    token?: string;
    id?: number;
    username?: string;
    email?: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    name?: string | null;
    birthdate?: string;
    gender?: string;
    weight?: number | null;
    height?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    goal_type?: string;
    suplements?: Order[];
    notificationNumber: number;
    phone?: string | null;
    imageProfile?: string | null;
    foodRestrictions?: string[];
    passwordForRegister?: string;
    isLogged?: boolean;
    isCoach?: boolean | null;
    goals?: UserGoals;
    metrics?: UserMetrics;
}

export interface UserFromApi {
    username?: string;
    email?: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    name?: string | null;
    birthdate?: string;
    gender?: string;
    weight?: number | null;
    height?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
    goal_type?: string;
    phone?: string | null;
    is_coach?: boolean | null;
}
