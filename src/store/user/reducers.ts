import { UserGoals, UserMetrics } from '@/types/metrics/MetricsGeneral';
import { User } from '@/types/user';
import { saveUserDataInStorage } from '@/utils/handleStorage';
import { PayloadAction } from '@reduxjs/toolkit';

export const initialState: User = {
    id: undefined,
    token: undefined,
    username: undefined,
    email: undefined,
    provider: undefined,
    confirmed: undefined,
    blocked: undefined,
    name: undefined,
    birthdate: undefined,
    gender: undefined,
    weight: undefined,
    height: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    goal_type: undefined,
    phone: undefined,
    foodRestrictions: undefined,
    passwordForRegister: undefined,
    isLogged: undefined,
    isCoach: undefined,
    imageProfile: undefined,
    goals: {
        caloriesToBurn: 0,
        caloriesToIngest: 0,
        waterToIngest: 2000,
        proteinToIngest: 0,
        carbsToIngest: 0,
        fatToIngest: 0,
        sleepTime: 8,
    },
    metrics: {
        weight: 0,
        waterDrinkedToday: 0,
        caloriesBurnedToday: 0,
        caloriesConsumedToday: 0,
        proteinConsumedToday: 0,
        carbsConsumedToday: 0,
        fatConsumedToday: 0,
        level: 0,
        waterGlassSize: 200,
    },
};

export const userReducers = {
    setUserInfo: (state: User, action: PayloadAction<Partial<User>>) => {
        const { payload } = action;
        const userInfo: User = payload;

        saveUserDataInStorage({
            ...state,
            ...userInfo,
        });

        return {
            ...state,
            ...userInfo,
        };
    },

    setUserMetrics: (state: User, action: PayloadAction<UserMetrics>) => {
        const { payload } = action;
        const userMetrics: UserMetrics = payload;

        saveUserDataInStorage({
            ...state,
            metrics: {
                ...state.metrics,
                ...userMetrics,
            },
        });

        return {
            ...state,
            metrics: {
                ...state.metrics,
                ...userMetrics,
            },
        };
    },

    setUserGoals: (state: User, action: PayloadAction<UserGoals>) => {
        const { payload } = action;
        const userGoals: UserGoals = payload;

        saveUserDataInStorage({
            ...state,
            goals: {
                ...state.goals,
                ...userGoals,
            },
        });

        return {
            ...state,
            goals: {
                ...state.goals,
                ...userGoals,
            },
        };
    },

    clearUserInfo: () => {
        return {
            ...initialState,
        };
    },
};
