import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import parseValue from "../parseValue";

dayjs.extend(customParseFormat);

const parseDate = (object: object, keys: string[]): void => {
    keys.forEach(key => parseValue(object, key, value =>
        dayjs(value, ["YYYY-MM-DD", "HH:mm"])));
};

export default parseDate;
