import _ from "lodash";
import {RootState, store} from "states";

type ReturnType = () => any;

interface IObserveStore<T, Selected = T> {
    select: (state: T) => Selected;
    isEqualFn: (previousState: Selected, currentState: Selected) => boolean;
    initialCall: boolean;
    store: any;
}

const defaults: IObserveStore<RootState> = {
    isEqualFn: (previousState, currentState) => _.isEqual(previousState, currentState),
    select: state => state,
    initialCall: true,
    store,
};

const observeStore = <T = RootState, Selected = RootState>(
    onChange: (state: Selected) => any,
    options: Partial<IObserveStore<T, Selected>>,
): ReturnType => {
    const {
        select,
        isEqualFn,
        initialCall,
    } = Object.assign(defaults, options);

    let currentState;

    const handleChange = () => {
        const state = store.getState();
        const nextState = select(state);
        const isEqual = isEqualFn(currentState, nextState);

        if (!isEqual) {
            currentState = nextState;
            onChange(currentState);
        }
    };

    const unsubscribe = store.subscribe(handleChange);

    if (initialCall) {
        handleChange();
    }

    return unsubscribe;
};

export default observeStore;
