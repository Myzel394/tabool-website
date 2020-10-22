export interface ActionType {
    type: string;
    payload: {
        [key: string]: any;
    };
}
