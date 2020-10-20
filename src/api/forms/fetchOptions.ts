import {FieldOptions} from "hooks/useGetOptions";
import {convertRawFields} from "utils";

import client from "../client";

const fetchOptions = async (url: string): Promise<FieldOptions> => {
    const {data} = await client.options(url);
    const optionsData = data?.actions?.post;

    if (optionsData) {
        return convertRawFields(optionsData);
    }
    throw new Error("Field options were not found.");
};

export default fetchOptions;
