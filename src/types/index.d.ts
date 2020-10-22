export * from "./api";
export * from "./reducers";

export interface ErrorResponse {
    [key: string]: string[];
}

export interface Choice {
    value: any;
    displayName: string;
}

