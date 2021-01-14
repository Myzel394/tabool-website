import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

import useUser from "../../useUser";

export interface IChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

const useChangePasswordAPI = () => {
    const {instance} = useContext(AxiosContext);
    const user = useUser();

    const userId = user.data?.id;

    return useCallback(async ({
        newPassword,
        oldPassword,
    }: IChangePasswordData): Promise<void> => {
        const {data} = await instance.post("/api/auth/change-password/", {
            user: userId,
            oldPassword,
            newPassword,
        }, await getLoginConfig());

        return data;
    }, [instance, userId]);
};

export default useChangePasswordAPI;
