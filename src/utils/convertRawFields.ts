import _ from "lodash";
import {FieldOptions} from "hooks/useGetOptions";


const convertRawFields = (rawFields: object): FieldOptions => {
    const arrayData = _.map(rawFields, (data, field) => [
        field, _.mapKeys(data, (x, key: string) => _.camelCase(key)),
    ]);

    return Object.fromEntries(arrayData);
};

export default convertRawFields;
