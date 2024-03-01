interface ImageSuplement {
    data: {
        attributes: {
            url: string;
        };
    }[];
}

interface Suplements {
    Name: string;
    Duration_days: number;
    Company: string;
    Image: ImageSuplement;
}

export interface SuplementsFromApi {
    id: number;
    attributes: Suplements;
}

export interface SuplementsFromApiData {
    data: {
        data: SuplementsFromApi[];
    };
}
