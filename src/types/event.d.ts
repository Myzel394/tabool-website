import {Dayjs} from "dayjs";

import {Room} from "./room";

export interface EventDetail {
    room?: Room;
    title: string;
    startDatetime: Dayjs;
    endDatetime: Dayjs;
    id: string;
}

