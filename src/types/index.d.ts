export * from "./api";

export interface ErrorResponse {
    [key: string]: string[];
}

export interface Choice {
    value: any;
    displayName: string;
}

