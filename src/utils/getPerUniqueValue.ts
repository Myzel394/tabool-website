interface Options<T> {
    doesExist?: (array: T[], element: T) => boolean;
    getKey?: (element: T) => string;
    getValue?: (element: T) => any;
}

const defaults = {
    doesExist: (array, element) =>
        array.some(arrayElement => arrayElement.id === element.id),
    getKey: element => element.date.toIsoString(),
    getValue: element => element,
};

const getPerUniqueValue = <T = any, ReturnType = T>(
    array: T[],
    options: Options<T> = {},
): Record<string, ReturnType[]> => {
    const {doesExist, getKey, getValue} = Object.assign(defaults, options);

    return array.reduce((obj, element) => {
        const isoDate = getKey(element);
        const elements = obj[isoDate] ?? [];

        if (!doesExist(elements, element)) {
            elements.push(getValue(element));
        }

        return {
            ...obj,
            [isoDate]: elements,
        };
    }, {});
};


export default getPerUniqueValue;
