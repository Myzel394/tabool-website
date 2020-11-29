import React, {ReactNode} from "react";
import {QueryCache, ReactQueryCacheProvider} from "react-query";

import UserContextHandler from "./UserContextHandler";
import AxiosContextHandler from "./AxiosContextHandler";

export interface IContexts {
    children: ReactNode;
}

const queryCache = new QueryCache();

const Contexts = ({children}: IContexts) => {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <AxiosContextHandler>
                <UserContextHandler>
                    {children}
                </UserContextHandler>
            </AxiosContextHandler>
        </ReactQueryCacheProvider>
    );
};

export default Contexts;
