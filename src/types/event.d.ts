import {Dayjs} from "dayjs";

import {Room} from "./room";
import {PreferredIdType} from "./api";

export interface EventApprox {
    title: string;
    startDatetime: Dayjs;
    endDatetime: Dayjs;
    isAllDay: boolean;
    id: string;
}

export interface EventDetail extends EventApprox {
    room: PreferredIdType<Room>;
    userRelation: {
        ignore: boolean;
    };
}

