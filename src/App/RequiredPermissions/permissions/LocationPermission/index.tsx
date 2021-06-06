import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {setLocation as setStoreLocation} from "state";
import {useDispatch} from "react-redux";

import PressOnAllow from "../PressOnAllow";
import RequestPermission from "../RequestPermission";
import {PermissionType} from "../types";

import location from "./location.svg";


const LocationPermission = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const setLocation = useCallback((perm: PermissionType) => dispatch(setStoreLocation(perm)), [dispatch]);

    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    return (
        <PressOnAllow show={isRequesting}>
            <RequestPermission
                title={t("Zugriff auf deinen Standort?")}
                description={t("In Zukunft sollen noch weitere Features hinzugefügt werden. " +
                    "Z.B.: Automatisches Mitteilen, ob es sich noch lohnt zum Asia Bistro \"Hoa Lu\" zu gehen oder " +
                    "wie viel Betrieb bei verschiedenen Geschäften, Bistros etc. ist." +
                    " Deine Standorte werden nicht mit anderen mitgeteilt und nur genutzt um dir und anderen lebenserleichternde Features zu bieten.")}
                svgLocation={location}
                onGrant={() => {
                    setIsRequesting(true);
                    navigator.geolocation.getCurrentPosition(() => {
                        setLocation(PermissionType.Granted);
                    }, error => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                setLocation(PermissionType.Blocked);
                                break;
                            case error.TIMEOUT:
                            case error.POSITION_UNAVAILABLE:
                                setLocation(PermissionType.NotAvailable);
                        }
                    });
                }}
                onDismiss={() => setLocation(PermissionType.Denied)}
            />
        </PressOnAllow>
    );
};

export default LocationPermission;
