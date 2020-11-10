import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail} from "types";
import {convertToDate, getLoginConfig} from "api";
import {fetchIdsToObject, isAllDay} from "utils";

import {useFetchRoomDetailAPI} from "../schoolData";

const useFetchEventDetailAPI = () => {
    const {instance} = useContext(AxiosContext);
    const fetchRoom = useFetchRoomDetailAPI();

    return useCallback(async (key: string, id: string): Promise<EventDetail> => {
        let {data} = await instance.get(`/api/data/event/${id}/`, await getLoginConfig());
        data = await fetchIdsToObject(data, {
            room: roomId => roomId && fetchRoom(`event_${id}_${roomId}`, roomId),
        });
        convertToDate(data, [
            "startDatetime",
            "endDatetime",
        ]);
        data.isAllDay = isAllDay(data.startDatetime, data.endDatetime);

        return data;
    }, [fetchRoom, instance]);
};

export default useFetchEventDetailAPI;
