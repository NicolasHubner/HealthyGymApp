// export interface Notion {
//     id: string;
//     userId: number;
//     notion: string;
//     createdAt: Date;
// }

export interface Notion {
    coach: string | number;
    user: string | number;
    datetime: string;
    note: string;
}
