/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext} from "react";

export interface Data {
    information: string;
    title: string;
    icon: JSX.Element;
}

export interface Form {
    input: JSX.Element;
    onEditModeLeft: () => any;
    helpText?: string;
}

export interface IDetailContext {
    ordering: string[];
    elevatedKey: string;
    enableReordering: boolean;
    data: {
        [key: string]: Data;
    };
    forms?: {
        [key: string]: Form;
    };
    forceEdit?: string[];

    setOrdering: (ordering: string[]) => any;
    setElevatedKey: (key: string) => any;
    setEnableReordering: (enabled: boolean) => any;

}

// @ts-ignore
const DetailContext = createContext<IDetailContext>({});

export default DetailContext;
