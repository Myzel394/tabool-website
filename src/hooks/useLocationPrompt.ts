import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {setLocation as setStoreLocation} from "states";
import {PermissionType} from "utils";

const useLocationPrompt = (): () => Promise<any> => {
    const dispatch = useDispatch();
    const setLocation = useCallback(
        (perm: PermissionType) => dispatch(setStoreLocation(perm)),
        [dispatch],
    );

    const promptUser = useCallback(() =>
        new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(() => {
                setLocation(PermissionType.Granted);
                resolve();
            }, error => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocation(PermissionType.Blocked);
                        break;
                    case error.TIMEOUT:
                    case error.POSITION_UNAVAILABLE:
                        setLocation(PermissionType.NotAvailable);
                }
                reject();
            }))
    , [setLocation]);

    return promptUser;
};

export default useLocationPrompt;
