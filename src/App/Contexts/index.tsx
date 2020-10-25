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
            <UserContextHandler>
                <AxiosContextHandler>
                    {children}
                </AxiosContextHandler>
            </UserContextHandler>
        </ReactQueryCacheProvider>
    );
};

export default Contexts;
