import {PermissionType} from "../utils";

export const PERMISSION_STATUS_TYPE_MAP: Record<PermissionState, PermissionType> = {
    denied: PermissionType.Blocked,
    granted: PermissionType.Granted,
    prompt: PermissionType.Ask,
};
