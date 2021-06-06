import {useEffect} from "react";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {observeStore} from "utils";
import {RootState} from "states";
import {ServerPreference} from "types";
import {IUpdatePreferenceData, useUpdatePreferenceAPI} from "hooks/apis";
import {useUser} from "hooks";


const UserProviderHandler = () => {
    const user = useUser();
    const updatePreferences = useUpdatePreferenceAPI();

    const {
        mutate,
    } = useMutation<ServerPreference, AxiosError, IUpdatePreferenceData>(
        values => {
            if (!user.data?.id) {
                throw new Error("User has no id.");
            }
            return updatePreferences(user.data.id, values);
        },
        {
            retry: 2,
        },
    );

    // Upload preference
    useEffect(() => {
        const unsubscribe = observeStore<RootState, RootState["preferences"]>(
            preferences => {
                mutate({
                    data: preferences,
                });
            },
            {
                select: state => state.preferences,
                initialCall: false,
            },
        );

        return unsubscribe;
    }, [mutate]);

    return null;
};
export default UserProviderHandler;


