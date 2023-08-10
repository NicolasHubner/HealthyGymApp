export interface FoodHistory {
    title: string;
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
}

export interface FullHistoryFoodHistory {
    food: FoodHistory;
    datetime: string;
}
