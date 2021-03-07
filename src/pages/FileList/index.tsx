import React, {useRef, useState} from "react";
import {DefaultPage, LoadingPage, ResponseWrapper} from "components";
import {IFetchStudentCourseResponse, useFetchStudentCourseListAPI} from "hooks/apis";
import {AxiosError} from "axios";
import {useQuery} from "react-query";
import {useQueryOptions} from "hooks";
import {useTranslation} from "react-i18next";
import {Box, Typography} from "@material-ui/core";
import {useDebouncedValue} from "@shopify/react-hooks";

import FileListContext, {IFileListContext} from "./FileListContext";
import CourseMaterials from "./CourseMaterials";
import Form from "./Form";

const FileList = () => {
    const {t} = useTranslation();
    const queryOptions = useQueryOptions();
    const fetchCourses = useFetchStudentCourseListAPI();

    const $initialData = useRef<IFileListContext["$initialData"]>({
        current: {},
    });

    const [subtractDownloaded, setSubtractDownloaded] = useState<boolean>(true);
    const [subtractNotAvailable, setSubtractNotAvailable] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");

    const debouncedSearch = useDebouncedValue(search);

    const {
        data,
        error,
        isLoading,
    } = useQuery<IFetchStudentCourseResponse, AxiosError>(
        "fetch_courses",
        () => fetchCourses(),
        {
            ...queryOptions,
            refetchOnWindowFocus: false,
        },
    );

    return (
        <ResponseWrapper<IFetchStudentCourseResponse>
            isLoading={isLoading}
            getDocumentTitle={() => t("Materialien")}
            error={error}
            data={data}
            renderLoading={() => <LoadingPage title={t("Kurse werden geladen...")} />}
        >
            {response => (
                <DefaultPage>
                    <Box my={5}>
                        <Box mb={2}>
                            <Typography variant="h2" align="center">
                                {t("Materialien")}
                            </Typography>
                        </Box>
                        <FileListContext.Provider
                            value={{
                                subtractNotAvailable,
                                subtractDownloaded,
                                rawSearch: search,
                                search: debouncedSearch,

                                setSubtractNotAvailable,
                                setSubtractDownloaded,
                                setSearch,

                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                $initialData,
                            }}
                        >
                            <>
                                <Form />
                                {response.results.map(course =>
                                    <CourseMaterials
                                        key={course.id}
                                        color={course.subject.userRelation.color}
                                        courseName={course.subject.name}
                                        courseId={course.id}
                                    />)}
                            </>
                        </FileListContext.Provider>
                    </Box>
                </DefaultPage>
            )}
        </ResponseWrapper>
    );
};
export default FileList;


