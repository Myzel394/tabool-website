export type ValidatorResponse = string | undefined;
export interface ValidationOptions {
 [key: string]: any;
}
export type ValidationFunction = (value) => ValidatorResponse;
