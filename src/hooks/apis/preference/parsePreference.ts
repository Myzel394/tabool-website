import {Preference} from "types";

const parsePreference = async (preference: Preference): Promise<void> => {
    preference.data = {};

    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Data from server is a string
        preference.data = JSON.parse(preference.data);
        // eslint-disable-next-line no-empty
    } catch {
    }
};

export default parsePreference;
