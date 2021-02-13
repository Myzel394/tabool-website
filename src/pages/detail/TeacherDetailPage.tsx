import genderColor from "constants/genderColor";

import React, {useContext} from "react";
import dayjs from "dayjs";
import {Link} from "@material-ui/core";
import {CgCompress, FaTransgenderAlt, MdEmail, MdTextFields} from "react-icons/all";
import {DetailPage, GenderStatus, LoadingPage} from "components";
import {useFetchTeacherDetailAPI} from "hooks/apis";
import {buildPath} from "utils";
import {useTranslation} from "react-i18next";
import {ErrorContext} from "contexts";
import {useDetailPageError, useQueryOptions} from "hooks";
import {TeacherDetail} from "types";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import createMailToLink from "mailto-link";


type TeacherKeys = "name" | "shortName" | "email" | "gender";

const TeacherDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const fetchTeacher = useFetchTeacherDetailAPI();
    const queryOptions = useQueryOptions();
    const {onFetchError} = useDetailPageError();
    const {dispatch: dispatchError} = useContext(ErrorContext);

    const {
        data: teacher,
        isLoading,
        refetch,
        isFetching,
        dataUpdatedAt,
    } = useQuery<TeacherDetail, AxiosError>(
        "fetch_teacher",
        () => fetchTeacher(id),
        {
            ...queryOptions,
            onError: error => onFetchError(error, Boolean(teacher)),
        },
    );

    // Rendering
    if (isLoading) {
        return <LoadingPage title={t("Lehrer wird geladen...")} />;
    }

    if (!teacher) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    return (
        <DetailPage<TeacherKeys, "">
            title={`${teacher.firstName} ${teacher.lastName}`}
            color={genderColor[teacher.gender]}
            orderingStorageName="detail:ordering:teacher"
            refetch={refetch}
            isRefreshing={isFetching}
            updatedAt={dayjs(dataUpdatedAt)}
            searchAllPath={buildPath("/agenda/teacher/")}
            defaultOrdering={[
                "name", "shortName", "email", "gender",
            ]}
            data={{
                name: {
                    disableShowMore: true,
                    title: t("Name"),
                    information: `${teacher.firstName} ${teacher.lastName}`,
                    icon: <MdTextFields />,
                },
                shortName: {
                    disableShowMore: true,
                    title: t("Kürzel"),
                    icon: <CgCompress />,
                    information: teacher.shortName,
                },
                email: {
                    title: t("E-Mail"),
                    icon: <MdEmail />,
                    information:
                        <Link
                            rel="noopener noreferrer"
                            href={createMailToLink({
                                to: teacher.email,
                            })}
                            underline="none"
                        >
                            {teacher.email}
                        </Link>,
                },
                gender: {
                    title: t("Geschlecht"),
                    icon: <FaTransgenderAlt />,
                    information:
                        <GenderStatus value={teacher.gender} />,
                },
            }}
        />
    );
};

export default TeacherDetailPage;
