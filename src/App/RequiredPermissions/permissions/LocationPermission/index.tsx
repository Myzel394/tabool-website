import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {setLocation as setStoreLocation} from "states";
import {useDispatch} from "react-redux";
import {useLocationPrompt} from "hooks";
import {PermissionType} from "utils";

import PressOnAllow from "../PressOnAllow";
import RequestPermission from "../RequestPermission";

import location from "./location.svg";


const LocationPermission = () => {
    const {t} = useTranslation();
    const promptUser = useLocationPrompt();
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
                    promptUser();
                }}
                onDismiss={() => setLocation(PermissionType.Denied)}
            />
        </PressOnAllow>
    );
};

export default LocationPermission;
