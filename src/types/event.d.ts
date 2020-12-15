import {Dayjs} from "dayjs";

import {Room} from "./room";

export interface EventApprox {
    title: string;
    startDatetime: Dayjs;
    endDatetime: Dayjs;
    isAllDay: boolean;
    id: string;
}

export interface EventDetail extends EventApprox {
    room: Room;
    userRelation: {
        ignore: boolean;
    };
}

