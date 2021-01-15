import React, {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

import Checks from "../Checks";

import UserContextHandler from "./UserContextHandler";
import AxiosContextHandler from "./AxiosContextHandler";
import UtilsContextHandler, {IUtilsContextHandler} from "./UtilsContextHandler";


export interface IContexts {
    children: ReactNode;
    activeTheme: IUtilsContextHandler["activeTheme"];
    setActiveTheme: IUtilsContextHandler["setActiveTheme"];

    bottomSheetHeight?: number;
}

const queryClient = new QueryClient();

const Contexts = ({children, setActiveTheme, activeTheme, bottomSheetHeight}: IContexts) => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserContextHandler>
                <AxiosContextHandler>
                    <UtilsContextHandler
                        activeTheme={activeTheme}
                        setActiveTheme={setActiveTheme}
                        bottomSheetHeight={bottomSheetHeight}
                    >
                        <Checks>
                            {children}
                        </Checks>
                    </UtilsContextHandler>
                </AxiosContextHandler>
            </UserContextHandler>
        </QueryClientProvider>
    );
};

export default Contexts;
