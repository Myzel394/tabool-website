import React, {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

import SnackbarWrapper from "../SnackbarWrapper";

import UserContextHandler from "./UserContextHandler";
import UtilsContextHandler from "./UtilsContextHandler";


export interface IContexts {
    children: ReactNode;
}

const queryClient = new QueryClient();

const Contexts = ({children}: IContexts) => {
    return (
        <QueryClientProvider client={queryClient}>
            <UtilsContextHandler>
                <SnackbarWrapper>
                    <UserContextHandler>
                        {children}
                    </UserContextHandler>
                </SnackbarWrapper>
            </UtilsContextHandler>
        </QueryClientProvider>
    );
};

export default Contexts;
