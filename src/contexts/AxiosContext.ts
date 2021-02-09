import {createContext} from "react";
import {AxiosInstance} from "axios";

export type BuildUrlFunction = (value: string) => string;

export interface IAxios {
    instance: AxiosInstance;
    buildUrl: BuildUrlFunction;

    _initialize: (values: {
        instance: AxiosInstance;
        buildUrl: BuildUrlFunction;
    }) => void;
}

export const initialAxiosState: IAxios = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance: null,
    buildUrl: (url: string) => url,

    _initialize: () => null,
};

const AxiosContext = createContext<IAxios>(initialAxiosState);

export default AxiosContext;
