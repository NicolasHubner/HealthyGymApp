import { DEFAULT_CALORIES_PER_TRAIN } from '@/helpers/constants/goals';
import { WorkoutApiResponse } from '@/types/metrics/Workout';
import { isToday } from 'date-fns';

export const extractWorkoutAttributes = (workouts: WorkoutApiResponse) => {
    if (!workouts || workouts.data.length <= 0) return undefined;

    const todayWorkouts = workouts.data.filter(workout => {
        return isToday(new Date(workout.attributes.datetime));
    });

    const todayCalories = todayWorkouts.length * DEFAULT_CALORIES_PER_TRAIN;
    const todayGoalPercent = (todayCalories / 2000) * 100;

    return {
        todayCalories,
        todayGoalPercent,
    };
};
