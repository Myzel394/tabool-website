export * from "./api";
export * from "./reducers";
export * from "./lesson";
export * from "./subject";
export * from "./teacher";
export * from "./validators";
export * from "./course";
export * from "./room";

export interface ErrorResponse {
    [key: string]: string[];
}

export interface Choice {
    value: any;
    displayName: string;
}

