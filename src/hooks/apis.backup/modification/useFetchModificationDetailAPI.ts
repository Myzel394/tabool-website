import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {ModificationDetail} from "types";
import {getLoginConfig} from "api";

import parseModification from "./parseModification";

const useFetchModificationDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string): Promise<ModificationDetail> => {
        const {data} = await instance.get(`/api/data/modification/${id}/`, await getLoginConfig());
        await parseModification(data);

        return data;
    }, [instance]);
};

export default useFetchModificationDetailAPI;