import React, {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

import UserContextHandler from "./UserContextHandler";
import UtilsContextHandler from "./UtilsContextHandler";


export interface IContexts {
    children: ReactNode;
}

const queryClient = new QueryClient();

const Contexts = ({children}: IContexts) => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextHandler>
                <UtilsContextHandler>
                    {children}
                </UtilsContextHandler>
            </UserContextHandler>
        </QueryClientProvider>
    );
};

export default Contexts;
