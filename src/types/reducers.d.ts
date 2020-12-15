export interface ActionType<
    Type extends string = string,
    Payload = Record<string, any>,
> {
    type: Type;
    payload: Payload;
}


export interface ReducerType<T> {
    state: T;
    dispatch: (action: ActionType) => void;
}
