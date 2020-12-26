import React, {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

import Checks from "../Checks";

import UserContextHandler from "./UserContextHandler";
import AxiosContextHandler from "./AxiosContextHandler";
import ErrorContextHandler from "./ErrorContextHandler";
import UtilsContextHandler from "./UtilsContextHandler";


export interface IContexts {
    children: ReactNode;
    bottomSheetHeight?: number;
}

const queryClient = new QueryClient();

const Contexts = ({children, bottomSheetHeight}: IContexts) => {
    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
};

export default Contexts;
