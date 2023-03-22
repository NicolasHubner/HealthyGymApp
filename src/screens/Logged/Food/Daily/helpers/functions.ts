export interface IFood {
    attributes: {
        calorie: number;
        carbohydrate: number;
        fat: number;
        protein: number;
        gender: string;
        time: number;
        title: string;
        preparation_method: string;
        goal_type: string;
        food_type?: IFoodType;
        image?: string;
        id: number;
        ingredients?: IIngredient[];
    };
    id: number;
}

export interface IFoodType {
    data: {
        attributes: {
            type: string;
        };
        id: number;
    };
}
export interface IIngredient {
    attributes: {
        ingredient: string;
    };
    id: number;
}

export interface IFoodDataPost {
    calorie: number;
    carbohydrate: number;
    fat: number;
    protein: number;
    total: number;
    id: number;
}
