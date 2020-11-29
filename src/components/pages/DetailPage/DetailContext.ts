/* eslint-disable @typescript-eslint/ban-ts-comment */
import {createContext} from "react";

export interface Data {
    information: string | JSX.Element;
    title: string;
    icon: JSX.Element;

    reset?: () => any;
    isUpdating?: boolean;
    input?: JSX.Element;
    onEditModeLeft?: () => any;
    disableShowMore?: boolean;
    helpText?: string;
}

export interface IDetailContext {
    ordering: string[];
    elevatedKey: string;
    enableReordering: boolean;
    data: {
        [key: string]: Data;
    };
    forceEdit?: string[];
    errors?: {
        [key: string]: string[];
    };

    setOrdering: (ordering: string[]) => any;
    setElevatedKey: (key: string) => any;
    setEnableReordering: (enabled: boolean) => any;
}

// @ts-ignore
const DetailContext = createContext<IDetailContext>({
});

export default DetailContext;
