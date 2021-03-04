import {configureStore} from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import {preferences} from "./reducers";

const store = configureStore({
    reducer: {
        preferences,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
