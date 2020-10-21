import _ from "lodash";


const convertRawFields = (rawFields: object) => {
    const arrayData = _.map(rawFields, (data, field) => [
        field, _.mapKeys(data, (x, key: string) => _.camelCase(key)),
    ]);

    return Object.fromEntries(arrayData);
};

export default convertRawFields;
