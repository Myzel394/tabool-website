import {Dispatch, SetStateAction, useEffect, useState} from "react";


export enum StorageType {
    Local = "local",
    Session = "session",
}

export const STORAGE_MAP: {
    [key in StorageType]: Storage;
} = {
    [StorageType.Local]: localStorage,
    [StorageType.Session]: sessionStorage,
};

const usePersistentStorage = <S = undefined>(
    defaultValue: S | (() => S),
    key: string,
    storageMethod: StorageType = StorageType.Local,
    serialize: ((value: S) => string) = JSON.stringify,
    deserialize: ((string: string) => S) = JSON.parse,
): [S, Dispatch<SetStateAction<S>>] => {
    const activeStorage = STORAGE_MAP[storageMethod];

    const [value, setValue] = useState<S>(() => {
        const savedValue = activeStorage.getItem(key);

        if (savedValue === null) {
            return defaultValue instanceof Function
                ? defaultValue()
                : defaultValue;
        }

        return deserialize(savedValue);
    });

    useEffect(() => {
        activeStorage.setItem(key, serialize(value));
    }, [activeStorage, deserialize, key, serialize, value]);

    return [value, setValue];
};

export default usePersistentStorage;
