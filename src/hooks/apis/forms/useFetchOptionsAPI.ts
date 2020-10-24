import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {convertRawFields} from "utils";

export interface IFetchOptionsData {}

export interface IFetchOptionsResponse {}

const useFetchOptionsAPI = (url: string) => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (): Promise<IFetchOptionsResponse> => {
        const {data} = await instance.options(url);
        const optionsData = data?.actions?.post;

        if (optionsData) {
            return convertRawFields(optionsData);
        }

        throw new Error("Field options were not found.");
    }, [instance, url]);
};

export default useFetchOptionsAPI;
