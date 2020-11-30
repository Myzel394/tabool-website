import React, {ReactNode} from "react";
import {QueryCache, ReactQueryCacheProvider} from "react-query";

import UserContextHandler from "./UserContextHandler";
import AxiosContextHandler from "./AxiosContextHandler";
import ErrorContextHandler from "./ErrorContextHandler";


export interface IContexts {
    children: ReactNode;
}

const queryCache = new QueryCache();

const Contexts = ({children}: IContexts) => {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <AxiosContextHandler>
                <UserContextHandler>
                    <ErrorContextHandler>
                        {children}
                    </ErrorContextHandler>
                </UserContextHandler>
            </AxiosContextHandler>
        </ReactQueryCacheProvider>
    );
};

export default Contexts;
