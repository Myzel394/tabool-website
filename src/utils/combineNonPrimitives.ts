export interface ICombineNonPrimitives<T> {
    getUniqueValue?: (element: T) => string | number | symbol;
}

const defaults = {
    getUniqueValue: element => element.id,
};

const combineNonPrimitives = <T>(arrays: T[][], options: ICombineNonPrimitives<T> = {}): T[] => {
    const {getUniqueValue} = Object.assign(defaults, options);

    const uniqueMap = arrays.reduce((obj, array) => {
        const uniqueMapForArray = array.reduce((obj, element) => ({
            ...obj,
            [getUniqueValue(element)]: element,
        }), {});

        return {
            ...obj,
            ...uniqueMapForArray,
        };
    }, {});

    return Object.values(uniqueMap);
};

export default combineNonPrimitives;
