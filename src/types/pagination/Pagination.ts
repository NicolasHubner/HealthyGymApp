export interface ApiPaginationResponse {
    pagination?: {
        page?: number | null;
        pageSize?: number | null;
        pageCount?: number | null;
        total?: number | null;
    };
}
