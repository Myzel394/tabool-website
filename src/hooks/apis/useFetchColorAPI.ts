import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";

export interface IFetchColorData {
    color: string;
}

type ColorType<T> = T & {
    fraction: T;
    value: string;
};

export interface IFetchColorResponse {
    hex: {
        value: string;
        clean: string;
    };
    rgb: ColorType<{
        r: number;
        g: number;
        b: number;
    }>;
    hsl: ColorType<{
        h: number;
        s: number;
        l: number;
    }>;
    hsv: ColorType<{
        h: number;
        s: number;
        v: number;
    }>;
    cmyk: ColorType<{
        c: number;
        m: number;
        y: number;
        k: number;
    }>;
    XYZ: ColorType<{
        X: number;
        Y: number;
        Z: number;
    }>;
    name: {
        value: string;
        closestNamedHex: string;
        exactMatchName: boolean;
        distance: number;
    };
    image: {
        bare: string;
        named: string;
    };
    contrast: {
        value: string;
    };
    _links: {
        self: {
            href: string;
        };
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    _embedded: {};
}

const useFetchColorAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        color,
    }: IFetchColorData): Promise<IFetchColorResponse> => {
        const {data} = await instance.get("https://www.thecolorapi.com/id", {
            params: {
                format: "json",
                hex: color,
            },
        });
        return data;
    }, [instance]);
};

export default useFetchColorAPI;
