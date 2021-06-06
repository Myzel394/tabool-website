import persistConfig from "constants/persistConfig";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Permission} from "types";
import {persistReducer} from "redux-persist";
import {PermissionType} from "App/RequiredPermissions/permissions/types";


export const permissionSlice = createSlice({
    name: "permission",
    initialState: {
        notification: PermissionType.Unknown,
        location: PermissionType.Unknown,
    } as Permission,
    reducers: {
        setNotification: (state, {payload: permissionType}: PayloadAction<PermissionType>) =>
            ({
                ...state,
                notification: permissionType,
            }),
        setLocation: (state, {payload: permissionType}: PayloadAction<PermissionType>) =>
            ({
                ...state,
                location: permissionType,
            }),
    },
});

export const {
    setLocation,
    setNotification,
} = permissionSlice.actions;

const persistedReducer = persistReducer(persistConfig, permissionSlice.reducer);

export default persistedReducer;
