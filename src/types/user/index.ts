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
    phone?: string | null;
    foodRestrictions?: string[];
    passwordForRegister?: string;
    isLogged?: boolean;
    isCoach?: boolean | null;
    metrics?: {
        weight?: number;
        caloriesConsumedToday?: number;
        caloriesBurnedToday?: number;
        caloriesGoal?: number;
        waterDrinkedToday?: number;
        level?: number;
        sleepHour?: number;
    };
}
