import {createContext} from "react";
import {AxiosInstance} from "axios";

export interface IAxios {
    instance: AxiosInstance;
    // Anonymous function is needed, because otherwise the Axios function is called immediately
    setInstance: (newInstance: () => AxiosInstance) => void;
}

export const initialAxiosState: IAxios = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instance: null,
    setInstance: () => null,
};

const AxiosContext = createContext<IAxios>(initialAxiosState);

export default AxiosContext;
