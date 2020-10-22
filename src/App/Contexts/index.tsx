import React, {ReactNode} from "react";
import {QueryCache, ReactQueryCacheProvider} from "react-query";

import UserContextHandler from "./UserContextHandler";

export interface IContexts {
    children: ReactNode;
}

const queryCache = new QueryCache();

const Contexts = ({children}: IContexts) => {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <UserContextHandler>
                {children}
            </UserContextHandler>
        </ReactQueryCacheProvider>
    );
};

export default Contexts;
