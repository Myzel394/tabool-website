import React, {ReactNode} from "react";
import {QueryCache, ReactQueryCacheProvider} from "react-query";

import UserContextHandler from "./UserContextHandler";
import AxiosContextHandler from "./AxiosContextHandler";
import {ErrorContext} from "contexts";

export interface IContexts {
    children: ReactNode;
}

const queryCache = new QueryCache();

const Contexts = ({children}: IContexts) => {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <AxiosContextHandler>
                <UserContextHandler>
                    <ErrorContext>
                        {children}
                    </ErrorContext>
                </UserContextHandler>
            </AxiosContextHandler>
        </ReactQueryCacheProvider>
    );
};

export default Contexts;
