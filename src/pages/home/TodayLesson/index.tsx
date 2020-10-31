import React, {memo} from "react";
import {useQuery} from "react-query";
import {useFetchLessonListAPI, useQueryOptions} from "hooks";
import dayjs from "dayjs";
import {LoadingIndicator} from "components/indicators";
import {useMemoOne} from "use-memo-one";
import {getISODate} from "utils";
import {LessonApprox} from "types";

import Lesson from "./Lesson";

export interface ITodayLessonManager {

}

const TodayLessonManager = (props: ITodayLessonManager) => {
    const today = useMemoOne(() => dayjs(new Date(2020, 9, 30, 1, 1, 1)), []);
    const queryFunction = useFetchLessonListAPI();
    const queryOptions = useQueryOptions();
    const {isLoading, isError, data: rawData} = useQuery(["today_lesson", {
        startDate: getISODate(today),
        endDate: getISODate(today),
    }], queryFunction, queryOptions);
    const data: LessonApprox[] = rawData?.results;

    return (
        <LoadingIndicator isLoading={isLoading}>
            {() =>
                <>
                    {data.map(lesson =>
                        <Lesson
                            key={lesson.id}
                            date={lesson.date}
                            startTime={lesson.lessonData.startTime}
                            endTime={lesson.lessonData.endTime}
                            courseId={lesson.lessonData.course}
                        />)}
                </>
            }
        </LoadingIndicator>
    );
};

export default memo(TodayLessonManager);
