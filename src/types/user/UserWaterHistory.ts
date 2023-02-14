export interface UserWaterHistory {
    id: number;
    attributes: {
        datetime: string;
        amount: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
