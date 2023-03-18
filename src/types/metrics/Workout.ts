export interface Workout {
    id: string;
    attributes: {
        datetime: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface WorkoutApiResponse {
    data: Workout[];
}
