import _ from "lodash";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const convertToDate = (response, paths: string[]): void => {
    for (const path of paths) {
        const value = _.get(response, path),
            valueAsDate = dayjs(value, ["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss", "HH:mm:ss", "HH:MM"]);

        _.set(response, path, valueAsDate);
    }
};

export default convertToDate;
