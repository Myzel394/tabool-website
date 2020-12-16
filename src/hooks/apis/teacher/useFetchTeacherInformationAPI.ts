import {useCallback, useContext} from "react";
import {AxiosContext} from "contexts";
import {getLoginConfig} from "api";

export interface IFetchTeacherInformationResponse {
    // Bei wie vielen Kursen man diesen Lehrer hat
    courseCount: number;
    // Wie viele Kurse dieser Lehrer unterrichtet
    teacherCourseCount: number;
    // Wie viele Schüler der Lehrer unterrichtet
    teacherParticipantsCount: number;
    // Wie oft der Lehrer gefehlt hat in den Kursen von dem Benutzer
    missingRatio: number;
    // Wie oft der Lehrer in all seinen Stunden gefehlt hat
    teacherMissingRatio: number;
}

const useFetchTeacherInformationAPI = () => {
    const {instance} = useContext(AxiosContext);

    return useCallback(async (key: string, id: string): Promise<IFetchTeacherInformationResponse> => {
        const {data} = await instance.get(`/api/data/teacher/${id}/information/`, await getLoginConfig());
        return data;
    }, [instance]);
};

export default useFetchTeacherInformationAPI;
