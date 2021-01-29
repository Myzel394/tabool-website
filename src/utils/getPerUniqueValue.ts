interface Options<T> {
    doesExist?: (array: T[], element: T) => boolean;
    getValue?: (element: T) => string;
}

const defaults = {
    doesExist: (array, element) =>
        array.some(arrayElement => arrayElement.id === element.id),
    getValue: element => element.date.toIsoString(),
};

const getPerUniqueValue = <T = any>(
    array: T[],
    options: Options<T> = {},
): Record<string, T[]> => {
    const {doesExist, getValue} = Object.assign(defaults, options);

    return array.reduce((obj, element) => {
        const isoDate = getValue(element);
        const elements = obj[isoDate] ?? [];

        if (!doesExist(elements, element)) {
            elements.push(element);
        }

        return {
            ...obj,
            [isoDate]: elements,
        };
    }, {});
};


export default getPerUniqueValue;
