export interface WaterApiResponse {
    data: Water[];
}

export interface Water {
    id: string;
    attributes: {
        datetime: string;
        amount: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
