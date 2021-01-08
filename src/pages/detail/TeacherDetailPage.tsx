import genderColor from "constants/genderColor";

import React, {useContext} from "react";
import dayjs from "dayjs";
import {Grid, Link, Typography} from "@material-ui/core";
import {CgCompress, FaTransgenderAlt, MdEmail, MdTextFields} from "react-icons/all";
import {DetailPage, GenderStatus, LoadingIndicator} from "components";
import {
    IFetchTeacherInformationResponse,
    IFetchTeacherListResponse,
    useFetchTeacherDetailAPI,
    useFetchTeacherInformationAPI,
} from "hooks/apis";
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
    const fetchTeacherInformation = useFetchTeacherInformationAPI();
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

    const {
        data: teacherInformation,
    } = useQuery<IFetchTeacherInformationResponse, AxiosError>(
        "fetch_teacher_information",
        () => fetchTeacherInformation(id),
        queryOptions,
    );

    // Rendering
    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!teacher) {
        dispatchError({
            type: "setError",
            payload: {},
        });
        return null;
    }

    return (
        <DetailPage<TeacherKeys, "", IFetchTeacherListResponse>
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
            bottomNode={teacherInformation && (() => {
                const {
                    courseCount,
                    teacherCourseCount,
                    teacherParticipantsCount,
                    missingRatio,
                    teacherMissingRatio,
                } = teacherInformation;
                const texts = [
                    {
                        title: t("Du hast {{count}} Kurse mit diesem Lehrer.", {
                            count: courseCount,
                        }),
                        key: "courseCount",
                    },
                    {
                        title: t("Dieser Lehrer unterrichtet insgesamt {{count}} Kurse.", {
                            count: teacherCourseCount,
                        }),
                        key: "teacherCourseCount",
                    },
                    {
                        title: t("{{count}} Schüler werden alleine von diesem Lehrer unterrichtet.", {
                            count: teacherParticipantsCount,
                        }),
                        key: "teacherParticipantsCount",
                    },
                    {
                        title: t("Der Lehrer fehlt in deinen Stunden durchschnittlich zu {{missingRatio}}%.", {
                            missingRatio: Math.round(missingRatio * 100),
                        }),
                        key: "missingRatio",
                    },
                    {
                        title: t("Insgesamt hat der Lehrer {{teacherMissingRatio}}% seiner Zeit gefehlt.", {
                            teacherMissingRatio: Math.round(teacherMissingRatio * 100),
                        }),
                        key: "teacherMissingRatio",
                    },
                ];

                return (
                    <article>
                        <Typography variant="h2">
                            {t("Informationen")}
                        </Typography>
                        <Grid container component="ul" spacing={1}>
                            {texts.map(text =>
                                <Grid key={text.key} item component="li">
                                    <Typography key={text.key} color="textSecondary">
                                        {text.title}
                                    </Typography>
                                </Grid>)}
                        </Grid>
                    </article>
                );
            })()}
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
