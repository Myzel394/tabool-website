import {Dayjs} from "dayjs";

export interface MaterialApprox {
    name: string;
    addedAt: Dayjs;
    id: string;
}

export interface MaterialDetail extends MaterialApprox {
    file: string;
    scoosoDownloadLink: string;
}

