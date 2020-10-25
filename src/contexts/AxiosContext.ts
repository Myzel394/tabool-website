import {createContext} from "react";
import {AxiosInstance} from "axios";

export interface IAxios {
    instance: AxiosInstance;
}

export const initialAxiosState: IAxios = {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    instance: null,
};

const AxiosContext = createContext<IAxios>(initialAxiosState);

export default AxiosContext;
