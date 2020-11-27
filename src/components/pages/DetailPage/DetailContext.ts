/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext} from "react";

export interface Data {
    information: string;
    title: string;
    icon: JSX.Element;
}

export interface IDetailContext {
    ordering: string[];
    elevatedKey: string;
    enableReordering: boolean;
    data: {
        [key: string]: Data;
    };

    setOrdering: (ordering: string[]) => any;
    setElevatedKey: (key: string) => any;
    setEnableReordering: (enabled: boolean) => any;
}

// @ts-ignore
const DetailContext = createContext<IDetailContext>({});

export default DetailContext;
