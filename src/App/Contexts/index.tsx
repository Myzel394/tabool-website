import React, {ReactNode} from "react";
import {QueryCache, ReactQueryCacheProvider} from "react-query";

import Checks from "../Checks";

import UserContextHandler from "./UserContextHandler";
import AxiosContextHandler from "./AxiosContextHandler";
import ErrorContextHandler from "./ErrorContextHandler";
import UtilsContextHandler from "./UtilsContextHandler";


export interface IContexts {
    children: ReactNode;
    bottomSheetHeight?: number;
}

const queryCache = new QueryCache();

const Contexts = ({children, bottomSheetHeight}: IContexts) => {
    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <AxiosContextHandler>
                <UserContextHandler>
                    <ErrorContextHandler>
                        <UtilsContextHandler bottomSheetHeight={bottomSheetHeight}>
                            <Checks>
                                {children}
                            </Checks>
                        </UtilsContextHandler>
                    </ErrorContextHandler>
                </UserContextHandler>
            </AxiosContextHandler>
        </ReactQueryCacheProvider>
    );
};

export default Contexts;
