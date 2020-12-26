import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {IDelete} from "types";

const useDeleteSubmissionAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (id: string | IDelete): Promise<void> => {
        if (typeof id === "string") {
            await instance.delete(`/api/data/submission/${id}/`, await getLoginConfig());
        } else {
            await instance.delete("/api/data/submission/", {
                ...await getLoginConfig(),
                params: {
                    ids: id.ids,
                },
            });
        }

    }, [instance]);
};

export default useDeleteSubmissionAPI;
