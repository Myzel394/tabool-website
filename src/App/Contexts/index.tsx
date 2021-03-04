import React, {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

import UserContextHandler from "./UserContextHandler";
import UtilsContextHandler from "./UtilsContextHandler";


export interface IContexts {
    children: ReactNode;

    bottomSheetHeight?: number;
}

const queryClient = new QueryClient();

const Contexts = ({children, bottomSheetHeight}: IContexts) => {
    return (
        <QueryClientProvider client={queryClient}>
            <UtilsContextHandler
                bottomSheetHeight={bottomSheetHeight}
            >
                <UserContextHandler>
                    {children}
                </UserContextHandler>
            </UtilsContextHandler>
        </QueryClientProvider>
    );
};

export default Contexts;
