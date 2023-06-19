export interface FoodHistory {
    title: string;
    calorie: number;
    carbohydrate: number;
    protein: number;
    fat: number;
    createdAt: string;
}

export interface FullHistoryFoodHistory {
    food: FoodHistory;
}
