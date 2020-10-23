import axios from "axios";
import {TeacherApprox} from "types/teachers";
import {PaginatedResponse} from "types";
import applyCaseMiddleware from "axios-case-converter";

import getLoginData from "../getLoginConfig";

export interface IFetchTeachersData {
    search: string;
    ordering?: string;
}

export type IFetchTeachersResponse = PaginatedResponse<TeacherApprox[]>;

const fetchTeachers = async (key, {
    search,
    ordering = "firstName",
}: IFetchTeachersData): Promise<IFetchTeachersResponse> => {
    const client = applyCaseMiddleware(axios.create());
    const loginData = await getLoginData();
    const {data} = await client.get("/api/data/teacher/", {
        ...loginData,
        params: {
            search,
            ordering,
        },
    });
    return data;
};

export default fetchTeachers;

