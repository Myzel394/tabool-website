import _ from "lodash";

const parseValue = <T extends object>(object: T, path: string, parser: (any) => any): void => {
    const value = _.get(object, path);
    const newValue = parser(value);
    _.set(object, path, newValue);
};

export default parseValue;

