export interface Food {
    data: {
        id: number;
        attributes: {
            preparation_method: string;
            title: string;
            time: number;
            calorie: number;
            carbohydrate: number;
            protein: number;
            fat: number;
            goal_type: string;
            gender: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}

export interface FoodHistoriesApiResponse {
    data: {
        id: number;
        attributes: {
            datetime: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            food: Food;
        };
    }[];
}
