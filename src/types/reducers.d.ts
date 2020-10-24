export interface ActionType {
    type: string;
    payload: {
        [key: string]: any;
    };
}


export interface ReducerType<T> {
    state: T;
    dispatch: (action: ActionType) => void;
}
