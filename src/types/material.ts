import {Dayjs} from "dayjs";

export interface MaterialApprox {
    name: string;
    addedAt: Dayjs;
    id: string;
    size: number;
}

export interface MaterialDetail extends Omit<MaterialApprox, "lesson"> {}

export interface MaterialList {
    name: string;
    addedAt: Dayjs;
    id: string;
    lesson: string;
}
