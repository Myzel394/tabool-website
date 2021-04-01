import {MutableRefObject, useLayoutEffect, useState} from "react";

export interface IUseFillField<
    DataType,
    KeyType,
    > {
    value: KeyType;
    elements: DataType[];
    findElementByKey: (key: KeyType) => DataType | undefined;
    fetchLabel: (key: KeyType) => Promise<string>;

    updateSearchValue: (search: string) => any;

    getOptionLabel: (data: DataType) => string;

    $hasModified: MutableRefObject<boolean>;

    updateFieldValue: (newValue: DataType | null) => any;
}

export type IUseFillFieldResult = boolean;

const useFillField = <
    DataType,
    KeyType
    >({
        elements,
        fetchLabel,
        updateFieldValue,
        getOptionLabel,
        updateSearchValue,
        findElementByKey,
        value,
        $hasModified,
    }: IUseFillField<DataType, KeyType>): IUseFillFieldResult => {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    // Fill field
    // If an initial value is set, it will only show the id of the object, which is bad for the user.
    useLayoutEffect(() => {
        if (value && !$hasModified.current && elements.length) {
            const element = findElementByKey(value);

            // First, let's try to get the element from the given list.
            if (element) {
                updateSearchValue(getOptionLabel(element));
                $hasModified.current = true;
            } else {
                // Otherwise fetch the element!
                setIsFetching(true);
                fetchLabel(value)
                    .then(updateSearchValue)
                    // If everything fails (which will only happen if the user manually sets a wrong id
                    // or hasn't access to the element), just remove the selection.
                    // The user has to recheck his choice, but a correct label will be shown this way at least.
                    .catch(() => updateFieldValue(null))
                    .finally(() => setIsFetching(false));
            }
        }
        // References shouldn't be in dependencies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getOptionLabel, updateFieldValue, fetchLabel, findElementByKey, value, elements.length, updateSearchValue]);

    return isFetching;
};

export default useFillField;
