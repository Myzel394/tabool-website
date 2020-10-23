import axios from "axios";
import {PaginatedResponse} from "types";
import {Subject} from "types/subject";
import applyCaseMiddleware from "axios-case-converter";

import getLoginData from "../getLoginConfig";

export interface IFetchSubjectsData {
    search: string;
    ordering?: string;
}


export type IFetchSubjectsResponse = PaginatedResponse<Subject[]>;

const fetchSubjects = async ({
    search,
    ordering = "name",
}: IFetchSubjectsData): Promise<IFetchSubjectsResponse> => {
    const client = applyCaseMiddleware(axios.create());
    console.log(client.getUri({
        url: "/api/data/subject/",
    }));
    const loginData = await getLoginData();
    const {data} = await client.get("/api/data/subject/", {
        ...loginData,
        params: {
            search,
            ordering,
        },
    });
    return data;
};

export default fetchSubjects;

