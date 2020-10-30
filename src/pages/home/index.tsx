import React, {memo} from "react";
import {Badges, Lesson, LessonBadge, LessonContent} from "components/timetable/lesson";
import dayjs from "dayjs";
import {FaClipboardList, FaStickyNote} from "react-icons/all";

const Home = () => {
    return (
        <>
            <p>Homepage</p>
            <Lesson
                isSingle
                color="rgb(253,85,68)"
                startTime={dayjs(new Date(2020, 10, 30, 9, 50))}
                endTime={dayjs(new Date(2020, 10, 30, 11, 20))}
            >
                <Badges>
                    {[
                        <LessonBadge
                            key="materials"
                            description="Materialien verfügbar"
                            getIcon={props => <FaStickyNote {...props} />}
                        />,
                        <LessonBadge
                            key="notes"
                            description="Hausaufgaben verfügbar"
                            getIcon={props => <FaClipboardList {...props} />}
                        />,
                    ]}
                </Badges>
                <LessonContent
                    courseName="Mathe 2"
                    roomName="118"
                    teacherName="Herbst"
                />
            </Lesson>
        </>
    );
};

export default memo(Home);
