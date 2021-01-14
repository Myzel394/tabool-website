import {Dayjs} from "dayjs";

export interface Session {
    userAgent: string;
    ip: string;
    lastActivity: Dayjs;
    isThis: boolean;
}
