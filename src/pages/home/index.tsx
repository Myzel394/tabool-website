import React, {memo} from "react";

import TodayLesson from "./TodayLesson";
import {Lesson, Badges, LessonContent} from "components/timetable/lesson";
import dayjs from "dayjs";

const Home = () => {
    return (
        <>
            <p>Homepage</p>
            <Lesson
                color="#23ac43"
                startTime={dayjs(new Date(2020, 10, 30, 9, 50))}
                endTime={dayjs(new Date(2020, 10, 30, 11, 20))}
            >
                <LessonContent
                    courseName="Mathe 2"
                    roomName="118"
                    teacherName="Herbst" />
            </Lesson>
        </>
    );
};

export default memo(Home);
