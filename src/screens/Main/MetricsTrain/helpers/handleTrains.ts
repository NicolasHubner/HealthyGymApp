export const createDataForRegisterTrain = (workoutId: number, userId: number) => {
    return {
        data: {
            datetime: new Date().toISOString(),
            workout: workoutId,
            user: userId,
        },
    };
};
