import {DependencyList, EffectCallback, useEffect} from "react";


// TODO: Add!
const useEffectTask = (callback: EffectCallback, deps: DependencyList, name: string, description: string): void => {
    useEffect(callback, deps);
};

export default useEffectTask;
