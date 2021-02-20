import genderColor from "constants/genderColor";

import React from "react";
import dayjs from "dayjs";
import {Link} from "@material-ui/core";
import {CgCompress, FaTransgenderAlt, MdEmail, MdTextFields} from "react-icons/all";
import {DetailPage, ErrorPage, GenderStatus, LoadingPage, ResponseWrapper} from "components";
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
        data,
        isLoading,
        refetch,
        isFetching,
        dataUpdatedAt,
        error,
    } = useQuery<TeacherDetail, AxiosError>(
        "fetch_teacher",
        () => fetchTeacher(id),
        queryOptions,
    );

    return (
        <ResponseWrapper<TeacherDetail>
            isLoading={isLoading}
            renderLoading={() => <LoadingPage title={t("Lehrer wird geladen...")} />}
            renderError={error =>
                <ErrorPage
                    status={error?.response?.status}
                    notFound={t("Dieser Lehrer wurde nicht gefunden.")}
                />
            }
            data={data}
            error={error}
        >
            {teacher =>
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
            }
        </ResponseWrapper>
    );
};

export default TeacherDetailPage;
