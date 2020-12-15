/* eslint-disable @typescript-eslint/ban-ts-comment */
import _ from "lodash";

_.mixin({
    deep(obj, mapper) {
        return mapper(_.mapValues(obj, (value) => {
            // @ts-ignore
            return _.isPlainObject(value) ? _.deep(value, mapper) : value;
        }));
    },
});

const snakeCase = (string) => {
    const separator = "_";
    const split = /(?=[A-Z])/;

    return string.split(split).join(separator).toLowerCase();
};

const snakeCaseKeys = (data) => {
    // @ts-ignore
    return _.deep(data, (x) =>
        _.mapKeys(x, (value, key) =>
            snakeCase(key)));
};

export default snakeCaseKeys;
