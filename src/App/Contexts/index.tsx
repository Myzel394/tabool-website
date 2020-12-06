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
            <UserContextHandler>
                <AxiosContextHandler>
                    <ErrorContextHandler>
                        <UtilsContextHandler bottomSheetHeight={bottomSheetHeight}>
                            <Checks>
                                {children}
                            </Checks>
                        </UtilsContextHandler>
                    </ErrorContextHandler>
                </AxiosContextHandler>
            </UserContextHandler>
        </ReactQueryCacheProvider>
    );
};

export default Contexts;
