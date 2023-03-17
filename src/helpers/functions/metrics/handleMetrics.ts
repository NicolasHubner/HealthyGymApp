import { FoodHistoriesApiResponse } from '@/types/metrics/FoodHistories';
import { WaterApiResponse } from '@/types/metrics/Water';
import { WorkoutApiResponse } from '@/types/metrics/Workout';
import { isToday } from 'date-fns';

export const getTodayWorkouts = (workouts: WorkoutApiResponse) => {
    return workouts?.data?.filter(workout => isToday(new Date(workout?.attributes?.datetime)));
};

export const getTodayWaterAmount = (waterGlasses: WaterApiResponse) => {
    const todayWaterDrinked = waterGlasses?.data?.filter(waterGlass =>
        isToday(new Date(waterGlass?.attributes?.datetime))
    );

    return todayWaterDrinked?.reduce((acc, waterGlass) => (acc += waterGlass.attributes.amount), 0);
};

export const getTodayCaloriesConsumed = (foodHistories: FoodHistoriesApiResponse) => {
    const todayCaloriesConsumed = foodHistories?.data?.filter(foodHistory =>
        isToday(new Date(foodHistory?.attributes?.datetime))
    );

    return todayCaloriesConsumed?.reduce(
        (acc, foodHistory) => (acc += foodHistory?.attributes?.food?.data?.attributes?.calorie),
        0
    );
};
