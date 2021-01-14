import {Dayjs} from "dayjs";

export interface Session {
    id: string;
    userAgent: string;
    ip: string;
    lastActivity: Dayjs;
    isThis: boolean;
}
