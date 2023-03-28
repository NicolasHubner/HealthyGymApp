import { FoodHistoriesApiResponse } from './FoodHistories';
import { WaterApiResponse } from './Water';
import { WeightApiResponse } from './Weight';
import { WorkoutApiResponse } from './Workout';

export interface UserGoals {
    caloriesToBurn?: number;
    caloriesToIngest?: number;
    waterToIngest?: number;
    weightToReach?: number;
    proteinToIngest?: number;
    carbsToIngest?: number;
    fatToIngest?: number;
    sleepTime?: number;
}

export interface UserMetrics {
    weight?: number;
    waterDrinkedToday?: number;
    caloriesConsumedToday?: number;
    caloriesBurnedToday?: number;
    proteinConsumedToday?: number;
    carbsConsumedToday?: number;
    fatConsumedToday?: number;
    level?: number;
    waterGlassSize?: number;
}

export interface MetricsParamToGetValue {
    workouts: WorkoutApiResponse;
    water: WaterApiResponse;
    weight: WeightApiResponse;
    foodHistories: FoodHistoriesApiResponse;
}
