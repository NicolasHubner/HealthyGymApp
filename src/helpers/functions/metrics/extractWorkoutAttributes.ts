import { WorkoutApiResponse } from '@/types/metrics/Workout';
import { isToday } from 'date-fns';

export const extractWorkoutAttributes = (workout: WorkoutApiResponse) => {
    if (!workout || workout.data.length <= 0) return undefined;

    const todayWorkouts = workout.data.filter(workout => {
        return isToday(workout.attributes.datetime);
    });
};
