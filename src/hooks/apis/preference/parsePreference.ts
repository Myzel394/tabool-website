import {Preferences, ServerPreference} from "types";

const parsePreference = async (preference: ServerPreference): Promise<Preferences> => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Data from server is a string
        return JSON.parse(preference.data);
        // eslint-disable-next-line no-empty
    } catch {
    }
    return {};
};

export default parsePreference;
