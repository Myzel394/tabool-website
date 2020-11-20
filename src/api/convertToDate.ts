import _ from "lodash";
import dayjs from "dayjs";

const convertToDate = (response, paths: string[]): void => {
    for (const path of paths) {
        const value = _.get(response, path),
            valueAsDate = dayjs(value, ["YYYY-MM-DDTHH:mm:ss", "YYYY-MM-DD", "HH:mm:ss"]);

        _.set(response, path, valueAsDate);
    }
};

export default convertToDate;
