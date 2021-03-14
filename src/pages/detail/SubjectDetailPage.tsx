import React, {useEffect, useState} from "react";
import {IUpdateSubjectRelationData, useFetchSubjectDetailAPI, useUpdateSubjectRelationAPI} from "hooks/apis";
import {useMutation, useQuery} from "react-query";
import {Subject} from "types";
import {AxiosError} from "axios";
import {useTranslation} from "react-i18next";
import {useQueryOptions} from "hooks";
import {ColorPicker, DetailPage, ErrorPage, LoadingPage, ResponseWrapper} from "components";
import {CgCompress, MdTitle} from "react-icons/all";
import dayjs from "dayjs";
import update from "immutability-helper";

type SubjectKeys = "name" | "shortName";

const PREDEFINED_COLORS = [
    "#fe4a49", "#ee4035", "#d62d20", "#ff5588", "#eb1736",
    "#3385c6", "#2ab7ca", "#4dcdc2", "#03396c", "#007CC7",
    "#f38a18", "#f37736", "#f3b831", "#ffa700", "#F1B24A",
    "#7bc043", "#0dba3e", "#73c423", "#266150", "#4D774E",
];

const SubjectDetailPage = ({match: {params: {id}}}) => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchSubject = useFetchSubjectDetailAPI();
    const updateRelation = useUpdateSubjectRelationAPI();

    const [subject, setSubject] = useState<Subject>();

    const {
        error,
        isLoading,
        data,
        isFetching,
        refetch,
        dataUpdatedAt,
    } = useQuery<Subject, AxiosError>(
        ["fetch_subject", id],
        () => fetchSubject(id),
        {
            ...queryOptions,
            onSuccess: setSubject,
        },
    );

    const {
        mutate,
    } = useMutation<Subject["userRelation"], AxiosError, IUpdateSubjectRelationData>(
        values => updateRelation(id, values),
        {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSuccess: userRelation => setSubject(prevState => ({
                ...prevState,
                userRelation,
            })),
        },
    );
    const color = subject?.userRelation?.color ?? undefined;

    useEffect(() => {
        let timer;

        if (color) {
            timer = setTimeout(() => mutate({
                color,
            }), 500);
        }

        return () => timer && clearTimeout(timer);
    }, [color, mutate]);

    return (
        <ResponseWrapper<Subject>
            data={data}
            error={error}
            renderLoading={() => <LoadingPage title={t("Fach wird geladen...")} />}
            getDocumentTitle={subject => subject.name}
            isLoading={isLoading}
            renderError={error =>
                <ErrorPage
                    status={error?.response?.status}
                    notFound={t("Dieses Fach wurde nicht gefunden.")}
                />
            }
        >
            {() =>
                (subject ? (
                    <DetailPage<SubjectKeys, "", Subject>
                        color={subject.userRelation.color}
                        orderingStorageName="subject"
                        defaultOrdering={[
                            "name", "shortName",
                        ]}
                        isRefreshing={isFetching}
                        data={{
                            name: {
                                information: subject.name,
                                icon: <MdTitle />,
                                disableShowMore: true,
                                title: t("Name"),
                            },
                            shortName: {
                                icon: <CgCompress />,
                                information: subject.shortName,
                                disableShowMore: true,
                                title: t("Bezeichnung"),
                            },
                        }}
                        bottomNode={
                            <ColorPicker
                                fullWidth
                                list={PREDEFINED_COLORS}
                                label={t("Farbe")}
                                value={subject.userRelation.color}
                                onChange={event => {
                                    const value = event.target?.value;

                                    if (value) {
                                        setSubject(prevState => update(prevState, {
                                            userRelation: {
                                                color: {
                                                    $set: value,
                                                },
                                            },
                                        }));
                                    }
                                }}
                            />
                        }
                        updatedAt={dayjs(dataUpdatedAt)}
                        title={subject.name}
                        onRefetch={refetch}
                    />
                ) : null)
            }
        </ResponseWrapper>
    );
};

export default SubjectDetailPage;
