export const getTodayCaloriesConsumed = (history: any) => {
    return history?.reduce((acc: any, item: any) => (acc += item?.food?.calorie ?? 0), 0) ?? 0;
};

export const getTodayProteinCarboFatConsumed = (history: any) => {
    if (!history) return { protein: 0, carbo: 0, fat: 0 };

    return history.reduce(
        (acc: any, item: any) => {
            acc.protein += item?.food?.protein ?? 0;
            acc.carbo += item?.food?.carbohydrate ?? 0;
            acc.fat += item?.food?.fat ?? 0;
            return acc;
        },
        { protein: 0, carbo: 0, fat: 0 }
    );
};
