import {createContext} from "react";
import axios, {AxiosInstance} from "axios";

export interface IAxios {
    instance: AxiosInstance;
}

export const initialAxiosState: IAxios = {
    instance: axios.create(),
};

const AxiosContext = createContext<IAxios>(initialAxiosState);

export default AxiosContext;
