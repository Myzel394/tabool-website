import {Dayjs} from "dayjs";

export interface MaterialApprox {
    name: string;
    addedAt: Dayjs;
    id: string;
    size: number;
}

export interface MaterialDetail extends Omit<MaterialApprox, "lesson"> {
    isDeleted: boolean;
}
