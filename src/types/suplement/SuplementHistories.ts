interface User {
    id: number;
    attributes: {
        username: string;
        name: string;
        email: string;
        user_profile: {
            data: UserProfile;
        };
    };
}

interface UserProfile {
    id: number;
    attributes: {
        datetime: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        photo: {
            data: {
                id: number;
                attributes: {
                    name: string;
                    alternativeText: string | null;
                    caption: string | null;
                    width: number;
                    height: number;
                    formats: {
                        large: {
                            ext: string;
                            url: string;
                            hash: string;
                            mime: string;
                            name: string;
                            path: string | null;
                            size: number;
                            width: number;
                            height: number;
                        };
                        small: {
                            ext: string;
                            url: string;
                            hash: string;
                            mime: string;
                            name: string;
                            path: string | null;
                            size: number;
                            width: number;
                            height: number;
                        };
                        medium: {
                            ext: string;
                            url: string;
                            hash: string;
                            mime: string;
                            name: string;
                            path: string | null;
                            size: number;
                            width: number;
                            height: number;
                        };
                        thumbnail: {
                            ext: string;
                            url: string;
                            hash: string;
                            mime: string;
                            name: string;
                            path: string | null;
                            size: number;
                            width: number;
                            height: number;
                        };
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: string | null;
                    provider: string;
                    provider_metadata: string | null;
                    createdAt: string;
                    updatedAt: string;
                };
            };
        };
    };
}

interface Suplement {
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
                    name: string;
                    alternativeText: string | null;
                    caption: string | null;
                    width: number;
                    height: number;
                    formats: {
                        small: {
                            ext: string;
                            url: string;
                            hash: string;
                            mime: string;
                            name: string;
                            path: string | null;
                            size: number;
                            width: number;
                            height: number;
                        };
                        medium: {
                            ext: string;
                            url: string;
                            hash: string;
                            mime: string;
                            name: string;
                            path: string | null;
                            size: number;
                            width: number;
                            height: number;
                        };
                        thumbnail: {
                            ext: string;
                            url: string;
                            hash: string;
                            mime: string;
                            name: string;
                            path: string | null;
                            size: number;
                            width: number;
                            height: number;
                        };
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: string | null;
                    provider: string;
                    provider_metadata: string | null;
                    createdAt: string;
                    updatedAt: string;
                };
            }[];
        };
    };
}

export interface SuplementHistoriesFromApi {
    id: number;
    attributes: {
        Quantity: number;
        datetime: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        Status: string;
        User: {
            data: User;
        };
        Suplement: {
            data: Suplement;
        };
    };
}
