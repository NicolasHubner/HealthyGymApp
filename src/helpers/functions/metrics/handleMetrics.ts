/* eslint-disable dot-notation */
import { FoodHistoriesApiResponse } from '@/types/metrics/FoodHistories';
import { WaterApiResponse } from '@/types/metrics/Water';
import { Workout, WorkoutApiResponse } from '@/types/metrics/Workout';
import { isToday, isThisWeek, format, isThisMonth, getWeekOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { createNewDateWithBrazilianTimezone } from '../dateConverter';

export const getWorkoutByWeek = (workouts: Workout[]) => {
    const thisWeekWorkouts = workouts?.filter(workout => {
        const date = new Date(workout?.attributes?.datetime);
        const fixedDate = createNewDateWithBrazilianTimezone(date);

        return isThisWeek(new Date(fixedDate));
    });

    const trainsByWeekDay = thisWeekWorkouts?.reduce((acc, curr) => {
        const date = createNewDateWithBrazilianTimezone(
            new Date(curr?.attributes?.datetime) ?? new Date()
        );
        const weekDay = format(date, 'EEEEEE', { locale: ptBR });

        if (Object.hasOwn(acc, weekDay)) {
            return {
                ...acc,
                [`${weekDay}`]: acc[`${weekDay}`] + 1,
            };
        }

        return {
            ...acc,
            [`${weekDay}`]: 1,
        };
    }, {});

    return { thisWeekWorkouts, trainsByWeekDay };
};

export const getWorkoutByMonth = (workouts: Workout[]) => {
    const thisMonthWorkouts = workouts?.filter(workout => {
        const date = new Date(workout?.attributes?.datetime);
        const fixedDate = createNewDateWithBrazilianTimezone(date);

        return isThisMonth(new Date(fixedDate));
    });

    const workoutsByCurrentMonth = thisMonthWorkouts?.reduce(
        (acc, curr) => {
            const date = createNewDateWithBrazilianTimezone(
                new Date(curr?.attributes?.datetime) ?? new Date()
            );

            const result = getWeekOfMonth(date);

            return {
                ...acc,
                ...(result === 1 &&
                    Object.hasOwn(acc, 'firstWeek') && { firstWeek: acc['firstWeek'] + 1 }),
                ...(result === 2 &&
                    Object.hasOwn(acc, 'secondWeek') && { secondWeek: acc['secondWeek'] + 1 }),
                ...(result === 3 &&
                    Object.hasOwn(acc, 'thirdWeek') && { thirdWeek: acc['thirdWeek'] + 1 }),
                ...(result === 4 &&
                    Object.hasOwn(acc, 'fourthWeek') && { fourthWeek: acc['fourthWeek'] + 1 }),
                ...(result === 5 &&
                    (Object.hasOwn(acc, 'fifthWeek')
                        ? { fifthWeek: acc['fifthWeek'] + 1 }
                        : { fifthWeek: 1 })),
            };
        },
        {
            firstWeek: 0,
            secondWeek: 0,
            thirdWeek: 0,
            fourthWeek: 0,
        }
    );

    return workoutsByCurrentMonth;
};

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

export const getCaloriesConsumedFromFullHistory = (history: any) => {
    return history?.reduce((acc: any, item: any) => (acc += item?.food?.calorie ?? 0), 0) ?? 0;
};
