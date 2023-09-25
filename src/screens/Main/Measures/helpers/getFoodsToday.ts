import { FoodHistoriesApiResponse } from '@/types/metrics/FoodHistories';
import { isToday } from 'date-fns';

export const getFoodsToday = (foodHistories: FoodHistoriesApiResponse) => {
    const todayFoods = foodHistories?.data?.filter(foodHistory =>
        isToday(new Date(foodHistory?.attributes?.datetime))
    );

    return todayFoods;
};
