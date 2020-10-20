import {FieldOptions} from "hooks/useGetOptions";
import {convertRawFields} from "utils";
import axios from "axios";

const fetchOptions = async (url: string): Promise<FieldOptions> => {
    const {data} = await axios.options(url);
    const optionsData = data?.actions?.post;

    if (optionsData) {
        return convertRawFields(optionsData);
    }
    throw new Error("Field options were not found.");
};

export default fetchOptions;
