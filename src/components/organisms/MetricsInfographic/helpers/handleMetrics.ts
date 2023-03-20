import { api } from '@/services/api';
import { DEFAULT_CALORIES_PER_TRAIN } from '@/helpers/constants/goals';
import {
    getTodayCaloriesConsumed,
    getTodayWaterAmount,
    getTodayWorkouts,
} from '@/helpers/functions/metrics/handleMetrics';

import { MetricsParamToGetValue, UserGoals } from '@/types/metrics/MetricsGeneral';

export const generateApiRequests = (headers: any, id: number | undefined) => {
    const endpointUrls = [
        `/workout-histories?filters[user][id][$eq]=${id}&sort[0]=datetime:desc&pagination[limit]=20`,
        `/water-histories?filters[user][id][$eq]=${id}&sort[0]=datetime:desc&pagination[limit]=80`,
        `/weight-histories?filters[user][id][$eq]=${id}&sort[0]=datetime:desc&pagination[limit]=10`,
        `/food-histories?filters[user][id][$eq]=${id}&populate=food`,
    ];

    const requests = endpointUrls.map(url => {
        return () => api.get(url, { headers }).then(res => res.data);
    });

    return requests;
};

export const generateApiResponses = async (requests: (() => Promise<any>)[]) => {
    const [workout, water, weight, foodHistories] = requests;
    const values = await Promise.all([workout(), water(), weight(), foodHistories()]);
    return values;
};

export const getValuesFromMetrics = (
    metricsParam: MetricsParamToGetValue,
    userGoals: Partial<UserGoals>
) => {
    const { workouts, water, weight, foodHistories } = metricsParam;

    const caloriesValue = (getTodayWorkouts(workouts)?.length ?? 0) * DEFAULT_CALORIES_PER_TRAIN;
    const trainPercentageValue = (caloriesValue / userGoals.caloriesToBurn!) * 100;

    const values = {
        weightValue: weight?.data?.[0]?.attributes?.weight ?? 0,
        waterIngestedTodayValue: getTodayWaterAmount(water),
        caloriesBurnedTodayValue:
            (getTodayWorkouts(workouts)?.length ?? 0) * DEFAULT_CALORIES_PER_TRAIN,
        caloriesConsumedTodayValue: getTodayCaloriesConsumed(foodHistories),
        trainPercentageValue,
    };

    return values;
};
