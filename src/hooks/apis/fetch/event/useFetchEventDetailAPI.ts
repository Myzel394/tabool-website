import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {EventDetail} from "types";
import {convertToDate, getLoginConfig} from "api";
import {isAllDay} from "utils";

export const parseEvent = (data: EventDetail): void => {
    convertToDate(data, [
        "startDatetime",
        "endDatetime",
    ]);
    data.isAllDay = isAllDay(data.startDatetime, data.endDatetime);
};

const useFetchEventDetailAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<EventDetail> => {
        const {data} = await instance.get(`/api/data/event/${id}/`, await getLoginConfig());
        parseEvent(data);

        return data;
    }, [instance]);
};

export default useFetchEventDetailAPI;
