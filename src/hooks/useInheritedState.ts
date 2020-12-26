import {Dispatch, SetStateAction, useEffect, useState} from "react";

const useInheritedState = <S = any>(parentValue: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
    const [value, setValue] = useState<S>(parentValue);

    useEffect(() => {
        setValue(parentValue);
    }, [parentValue]);

    return [value, setValue];
};

export default useInheritedState;
