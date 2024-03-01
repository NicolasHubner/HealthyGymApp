interface SuplementData {
    id: number;
    attributes: {
        Name: string;
        Duration_days: number;
        Company: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        Image: {
            data: {
                id: number;
                attributes: {
                    formats: {
                        thumbnail: {
                            url: string;
                        };
                    };
                };
            }[];
        };
    };
}

interface OrderAttributes {
    Quantity: number;
    datetime: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Status: string;
    Suplement: {
        data: SuplementData;
    };
}

export interface Order {
    id: number;
    attributes: OrderAttributes;
}
