import {configureStore} from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";

// eslint-disable-next-line import/no-cycle
import {preferences} from "./reducers";

const store = configureStore({
    reducer: {
        preferences,
    },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
