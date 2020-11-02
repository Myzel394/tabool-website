export interface PaginatedResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T;
}


export interface ErrorResponse {
    [key: string]: string[];
}

export interface Choice {
    value: any;
    displayName: string;
}
