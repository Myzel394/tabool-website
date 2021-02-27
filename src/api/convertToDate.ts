import _ from "lodash";
import dayjs from "dayjs";

type ValueOf<T> = T[keyof T];

const convertToDate = <T extends Record<string, any>>(response: T, paths: ValueOf<T>[]): void => {
    for (const path of paths) {
        const value = _.get(response, path);

        if (value) {
            const valueAsDate = dayjs(value, ["YYYY-MM-DDTHH:mm:ss", "YYYY-MM-DD", "HH:mm:ss"]);

            _.set(response, path, valueAsDate);
        }
    }
};

export default convertToDate;
