import cardioModeradoImg from '@/assets/cardio_moderado.png';
import cardioAvancadoImg from '@/assets/cardio_avancado.png';
import forcaMusculoImg from '@/assets/forca_musculo.png';
import { UserGoals, UserMetrics } from '@/types/metrics/MetricsGeneral';

export interface UserGoal {
    id: string;
    title: string;
    subtitle: string;
    intensity: number;
    image: string;
}

export const DEFAULT_CALORIES_PER_TRAIN = 400;

export const MOCKED_CALORIES_GOAL = 2000;

export const emptyMetricsForGlobalState: UserMetrics = {
    weight: 0,
    waterDrinkedToday: 0,
    caloriesBurnedToday: 0,
    caloriesConsumedToday: 0,
    proteinConsumedToday: 0,
    carbsConsumedToday: 0,
    fatConsumedToday: 0,
    level: 0,
};

export const emptyGoalsForGlobalState: UserGoals = {
    caloriesToBurn: 4000,
    caloriesToIngest: 3000,
    waterToIngest: 2000,
    proteinToIngest: 1000,
    carbsToIngest: 1000,
    fatToIngest: 1000,
    sleepTime: 8,
};

export const userGoalOptions: UserGoal[] = [
    {
        id: 'moderate-cardio',
        title: 'Voltar à forma',
        subtitle: 'Cárdio moderado • 7 min',
        intensity: 2,
        image: cardioModeradoImg,
    },
    {
        id: 'advanced-cardio',
        title: 'Defina o corpo',
        subtitle: 'Cárdio avançado • 7 min',
        intensity: 2,
        image: cardioAvancadoImg,
    },
    {
        id: 'strength-muscle',
        title: 'Aumente a massa',
        subtitle: 'Força e músculo • 7 min',
        intensity: 3,
        image: forcaMusculoImg,
    },
];
