import {Dayjs} from "dayjs";

export interface MaterialApprox {
    lesson: string;
    name: string;
    addedAt: Dayjs;
    id: string;
}

export interface MaterialDetail extends MaterialApprox {
    file?: string;
    scoosoDownloadLink: string;
}

