import { FoodHistoriesApiResponse } from '@/types/metrics/FoodHistories';
import { isToday } from 'date-fns';

export const getTodayCaloriesConsumed = (foodHistories: FoodHistoriesApiResponse) => {
    const todayCaloriesConsumed = foodHistories?.data?.filter(foodHistory =>
        isToday(new Date(foodHistory?.attributes?.datetime))
    );

    return todayCaloriesConsumed?.reduce(
        (acc, foodHistory) => (acc += foodHistory?.attributes?.food?.data?.attributes?.calorie),
        0
    );
};

export const getTodayProteinCarboFatConsumed = (foodHistories: FoodHistoriesApiResponse) => {
    const todayProteinCarboFatConsumed = foodHistories?.data?.filter(foodHistory =>
        isToday(new Date(foodHistory?.attributes?.datetime))
    );

    return todayProteinCarboFatConsumed?.reduce(
        (acc, foodHistory) => {
            acc.protein += foodHistory?.attributes?.food?.data?.attributes?.protein;
            acc.carbo += foodHistory?.attributes?.food?.data?.attributes?.carbohydrate;
            acc.fat += foodHistory?.attributes?.food?.data?.attributes?.fat;
            return acc;
        },
        { protein: 0, carbo: 0, fat: 0 }
    );
};
