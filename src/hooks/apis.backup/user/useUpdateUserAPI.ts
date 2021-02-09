import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {UserDetail} from "types";

import useUser from "../../useUser";


export interface IUpdateUserData {
    loadScoosoData?: boolean;
}

export type IUpdateUserDataResponse = UserDetail;

const useUpdateUserAPI = () => {
    const {instance} = useContext(AxiosContext);
    const user = useUser();

    return useCallback(async ({
        loadScoosoData,
    }: IUpdateUserData): Promise<IUpdateUserDataResponse> => {
        if (!user.data?.id) {
            throw TypeError("User is not authenticated");
        }

        const {data} = await instance.patch(`/api/data/user/${user.data.id}/`, {
            loadScoosoData,
        }, await getLoginConfig());

        return data;
    }, [instance, user.data?.id]);
};

export default useUpdateUserAPI;
