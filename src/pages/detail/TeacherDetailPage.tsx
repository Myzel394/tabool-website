import genderColor from "constants/genderColor";

import React, {memo, useContext} from "react";
import {useTranslation} from "react-i18next";
import {useDetailPageError, useFetchTeacherDetailAPI, useFetchTeacherInformationAPI, useQueryOptions} from "hooks";
import {useQuery} from "react-query";
import {AxiosError} from "axios";
import {TeacherDetail} from "types";
import {DetailPage, GenderStatus, LoadingIndicator} from "components";
import {ErrorContext} from "contexts";
import {CgCompress, FaTransgenderAlt, MdEmail, MdTextFields} from "react-icons/all";
import {Grid, Link, Typography} from "@material-ui/core";
import createMailToLink from "mailto-link";
import dayjs from "dayjs";
import {IFetchTeacherInformationResponse} from "hooks/apis/fetch/schoolData/useFetchTeacherInformationAPI";


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
        updatedAt,
    } = useQuery<TeacherDetail, AxiosError>(
        ["fetch_teacher", id],
        fetchTeacher,
        {
            ...queryOptions,
            onError: error => onFetchError(error, Boolean(teacher)),
        },
    );

    const {
        data: teacherInformation,
    } = useQuery<IFetchTeacherInformationResponse, AxiosError>(
        ["fetch_teacher_information", id],
        fetchTeacherInformation,
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
        <DetailPage<TeacherKeys>
            title={`${teacher.firstName} ${teacher.lastName}`}
            color={genderColor[teacher.gender]}
            orderingStorageName="detail:ordering:teacher"
            refetch={refetch}
            isRefreshing={isFetching}
            updatedAt={dayjs(updatedAt)}
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
                        title: t("Du hast {{courseCount}} Kurse mit diesem Lehrer.", {
                            courseCount,
                        }),
                        key: "courseCount",
                    },
                    {
                        title: t("Dieser Lehrer unterrichtet insgesamt {{teacherCourseCount}} Kurse.", {
                            teacherCourseCount,
                        }),
                        key: "teacherCourseCount",
                    },
                    {
                        title: t("{{teacherParticipantsCount}} Schüler werden alleine von diesem Lehrer unterrichtet.", {
                            teacherParticipantsCount,
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
                    <>
                        <Typography variant="h4">
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
                    </>
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

export default memo(TeacherDetailPage);
