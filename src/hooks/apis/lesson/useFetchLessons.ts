import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";

export interface IFetchLessonsData {

}

export interface IFetchLessonsResponse {

}

const useFetchLessons = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({}: IFetchLessonsData): Promise<IFetchLessonsResponse> => {
        const {data} = await instance; // ...
        return data;
    }, [instance]);
};

export default useFetchLessons;
