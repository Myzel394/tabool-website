import {Preference} from "types";

const parsePreference = async (preference: Preference): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Data from server is a string
    preference.data = JSON.parse(preference.data);
};

export default parsePreference;
