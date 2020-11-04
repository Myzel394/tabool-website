import React, {memo, useMemo} from "react";
import {useQuery} from "react-query";
import {useFetchLessonListAPI, useQueryOptions} from "hooks";
import dayjs from "dayjs";
import {LoadingIndicator} from "components/indicators";
import {getISODate} from "utils";
import {Box} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useTranslation} from "react-i18next";
import {LessonApprox} from "types";
import _ from "lodash";

import LessonManager, {ColorType} from "./LessonManager";

export interface ITodayLessonManager {
    onColor: (data: ColorType, index: number) => void;
}

const TodayLessonManager = ({onColor}: ITodayLessonManager) => {
    const {t} = useTranslation();
    const today = useMemo(() =>
        dayjs(new Date(2020, 9, 29, 1, 1, 1))
    , []);
    const queryFunction = useFetchLessonListAPI();
    const queryOptions = useQueryOptions();
    const {isLoading, isError, data: rawData} = useQuery(["today_lesson", {
        startDate: getISODate(today),
        endDate: getISODate(today),
    }], queryFunction, queryOptions);
    const lessons = useMemo((): LessonApprox[] | void => {
        if (rawData?.results) {
            let lessons: LessonApprox[] = rawData.results;
            lessons = _.orderBy(lessons, item => item.lessonData.startTime);
            return lessons;
        }
    }, [rawData]);

    if (isError || !lessons || lessons?.length === 0) {
        return <Alert color="error">{t("Stundenplan konnte nicht geladen werden")}</Alert>;
    }

    return (
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <>
                    {lessons.map((lesson, index) =>
                        <Box key={lesson.id} mt={1}>
                            <LessonManager
                                lessonId={lesson.id}
                                delay={index * 120}
                                onColor={value => onColor(value, index)}
                            />
                        </Box>)}
                </>
            }
        </LoadingIndicator>
    );
};

export default memo(TodayLessonManager);
