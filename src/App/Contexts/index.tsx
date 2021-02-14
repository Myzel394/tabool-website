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
            <UserContextHandler>
                <UtilsContextHandler
                    bottomSheetHeight={bottomSheetHeight}
                >
                    {children}
                </UtilsContextHandler>
            </UserContextHandler>
        </QueryClientProvider>
    );
};

export default Contexts;
