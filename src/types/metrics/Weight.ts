export interface WeightApiResponse {
    data: Weight[];
}

export interface Weight {
    id: string;
    attributes: {
        datetime: string;
        weight: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}
