import React, {useState} from "react";
import {useTranslation} from "react-i18next";

import PressOnAllow from "../PressOnAllow";
import RequestPermission from "../RequestPermission";
import PermissionType from "../permissionType";

import {location} from "./svg";


export interface ILocationPermission {
    onDone: (hasGranted: PermissionType) => void;
}

const LocationPermission = ({onDone}: ILocationPermission) => {
    const {t} = useTranslation();

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
                        onDone(PermissionType.Granted);
                        setIsRequesting(false);
                    }, error => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                onDone(PermissionType.NotGranted);
                                break;
                            case error.TIMEOUT:
                            case error.POSITION_UNAVAILABLE:
                                onDone(PermissionType.NotAvailable);
                        }

                        setIsRequesting(false);
                    });
                }}
                onDismiss={() => onDone(PermissionType.NotGranted)}
            />
        </PressOnAllow>
    );
};

export default LocationPermission;
