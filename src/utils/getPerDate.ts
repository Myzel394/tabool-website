interface Options<T> {
    doesExist?: (array: T[], element: T) => boolean;
    getIsoDate?: (element: T) => string;
}

const defaults = {
    doesExist: (array, element) =>
        array.some(arrayElement => arrayElement.id === element.id),
    getIsoDate: element => element.date.toIsoString(),
};

const getPerDate = <T = any>(
    array: T[],
    options: Options<T> = {},
): Record<string, T[]> => {
    const {doesExist, getIsoDate} = Object.assign(defaults, options);

    return array.reduce((obj, element) => {
        const isoDate = getIsoDate(element);
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


export default getPerDate;
