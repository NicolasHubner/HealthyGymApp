import { FoodHistoriesApiResponse } from './FoodHistories';
import { WaterApiResponse } from './Water';
import { WeightApiResponse } from './Weight';
import { WorkoutApiResponse } from './Workout';

export interface Metrics {
    workouts: WorkoutApiResponse;
    water: WaterApiResponse;
    weight: WeightApiResponse;
    foodHistories: FoodHistoriesApiResponse;
}
