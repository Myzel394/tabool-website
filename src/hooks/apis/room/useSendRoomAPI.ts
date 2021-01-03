import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";
import {Room} from "types";

export interface ISendRoomData {
    place: string;
}

export type ISendRoomResponse = Room;

const useSendRoomAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async ({
        place,
    }: ISendRoomData): Promise<ISendRoomResponse> => {
        // eslint-disable-next-line no-console
        console.log(place);
        const {data} = await instance.post("/api/data/room/", {
            place,
        }, await getLoginConfig());

        return data;
    }, [instance]);
};

export default useSendRoomAPI;
