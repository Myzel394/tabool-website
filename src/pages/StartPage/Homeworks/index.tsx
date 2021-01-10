import React, {memo, useContext, useRef} from "react";
import {HomeworkDetail} from "types";
import {Homework, HorizontalScroll} from "components";
import {useElementSize} from "hooks";
import tinycolor from "tinycolor2";
import update from "immutability-helper";

import StartPageContext from "../StartPageContext";

const Homeworks = () => {
    const {
        dailyData: {
            homeworks,
        },
        setDailyData,
    } = useContext(StartPageContext);

    const $wrapper = useRef<any>();
    const [wrapperWidth = 0] = useElementSize($wrapper);

    const width = Math.max(200, wrapperWidth * 0.9);

    return (
        <div ref={$wrapper}>
            <HorizontalScroll<HomeworkDetail> elements={homeworks}>
                {homework =>
                    <Homework
                        style={{
                            width: width || "100%",
                            boxShadow: `0 0.2em 1em 0.4em ${tinycolor(homework.lesson.lessonData.course.subject.userRelation.color).setAlpha(0.3)}`,
                        }}
                        subject={homework.lesson.lessonData.course.subject}
                        information={homework.information}
                        id={homework.id}
                        creationDate={homework.createdAt}
                        dueDate={homework.dueDate}
                        completed={homework.userRelation.completed}
                        ignore={homework.userRelation.ignore}
                        onServerUpdate={newHomeworkRelation => setDailyData(prevState => {
                            const index = prevState.homeworks.findIndex(element => element.id === homework.id);

                            return update(prevState, {
                                homeworks: {
                                    [index]: {
                                        userRelation: {
                                            $set: newHomeworkRelation,
                                        },
                                    },
                                },
                            });
                        })}
                    />
                }
            </HorizontalScroll>
        </div>
    );
};

export default memo(Homeworks);
