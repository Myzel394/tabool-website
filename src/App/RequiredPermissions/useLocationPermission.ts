import {useCallback, useEffect} from "react";
import {supportsLocation} from "supports";
import {useDispatch} from "react-redux";
import {setLocation as setStoreLocation} from "state";
import {useAsync} from "hooks";

import {PermissionType} from "./permissions/types";

const getLocationPermission = async (): Promise<PermissionType | void> => {
    if (!supportsLocation) {
        return PermissionType.NotAvailable;
    }

    if (!navigator.permissions) {
        return;
    }

    try {
        const status = await navigator.permissions.query({
            name: "geolocation",
        });

        switch (status.state) {
            case "granted":
                return PermissionType.Granted;
            case "denied":
                return PermissionType.Blocked;
            case "prompt":
                return PermissionType.Unknown;
        }
        // eslint-disable-next-line no-empty
    } catch {}
};

const useLocationPermission = () => {
    const dispatch = useDispatch();
    const setLocation = useCallback((perm: PermissionType) => dispatch(setStoreLocation(perm)), [dispatch]);

    const getStatus = useCallback(async (): Promise<PermissionStatus | undefined> => {
        if (!navigator.permissions) {
            return;
        }

        return navigator.permissions.query({
            name: "geolocation",
        });
    }, []);
    const {
        value: permissionsStatus,
    } = useAsync(getStatus);

    // Get initial state
    useEffect(() => {
        getLocationPermission().then(perm => {
            if (perm) {
                setLocation(perm);
            }
        });
    }, [setLocation]);

    // Update permission on change
    useEffect(() => {
        if (permissionsStatus) {
            // eslint-disable-next-line func-style
            const updateLocation = function(this: PermissionStatus) {
                switch (this.state) {
                    case "granted":
                        setLocation(PermissionType.Granted);
                        break;
                    case "denied":
                        setLocation(PermissionType.Blocked);
                        break;
                    case "prompt":
                        setLocation(PermissionType.Unknown);
                        break;
                }
            };

            permissionsStatus.addEventListener("change", updateLocation);

            return () => permissionsStatus.removeEventListener("change", updateLocation);
        }
    }, [permissionsStatus, setLocation]);
};

export default useLocationPermission;
