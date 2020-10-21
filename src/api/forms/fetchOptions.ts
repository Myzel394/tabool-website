import {FieldOptions} from "hooks/useGetOptions";
import {convertRawFields} from "utils";
import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const fetchOptions = async (url: string): Promise<FieldOptions> => {
    const client = applyCaseMiddleware(axios.create());
    const {data} = await client.options(url);
    const optionsData = data?.actions?.post;

    if (optionsData) {
        return convertRawFields(optionsData);
    }
    throw new Error("Field options were not found.");
};

export default fetchOptions;
