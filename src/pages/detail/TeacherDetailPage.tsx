import genderColor from "constants/genderColor";

import React from "react";
import dayjs from "dayjs";
import {Link} from "@material-ui/core";
import {CgCompress, FaTransgenderAlt, MdEmail, MdTextFields} from "react-icons/all";
import {DetailPage, ErrorPage, GenderStatus, LoadingPage} from "components";
import {useFetchTeacherDetailAPI} from "hooks/apis";
import {useTranslation} from "react-i18next";
import {useQueryOptions} from "hooks";
import {TeacherDetail} from "types";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import createMailToLink from "mailto-link";


type TeacherKeys = "name" | "shortName" | "email" | "gender";

const TeacherDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const fetchTeacher = useFetchTeacherDetailAPI();
    const queryOptions = useQueryOptions();

    const {
        data: teacher,
        isLoading,
        refetch,
        isFetching,
        dataUpdatedAt,
        error,
    } = useQuery<TeacherDetail, AxiosError>(
        "fetch_teacher",
        () => fetchTeacher(id),
        {
            ...queryOptions,
            retry: (failureCount, error) => error.response?.status !== 404,
        },
    );

    // Rendering
    if (isLoading) {
        return <LoadingPage title={t("Lehrer wird geladen...")} />;
    }

    if (error || !teacher) {
        return (
            <ErrorPage
                status={error?.response?.status}
                notFound={t("Dieser Lehrer wurde nicht gefunden.")}
            />
        );
    }

    return (
        <DetailPage<TeacherKeys, "">
            title={`${teacher.firstName} ${teacher.lastName}`}
            color={genderColor[teacher.gender]}
            orderingStorageName="teacher"
            isRefreshing={isFetching}
            updatedAt={dayjs(dataUpdatedAt)}
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
            onRefetch={refetch}
        />
    );
};

export default TeacherDetailPage;
