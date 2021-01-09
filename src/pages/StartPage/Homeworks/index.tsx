import React, {memo, useRef} from "react";
import {HomeworkDetail} from "types";
import {Homework, HorizontalScroll} from "components";
import {useElementSize} from "hooks";


export interface IHomeworks {
    homeworks: HomeworkDetail[];
}

const Homeworks = ({
    homeworks,
}: IHomeworks) => {
    const $wrapper = useRef<any>();
    const [wrapperWidth = 0] = useElementSize($wrapper);
    const width = Math.max(200, wrapperWidth * 0.9);

    // eslint-disable-next-line no-console
    console.log(wrapperWidth);

    return (
        <div ref={$wrapper}>
            <HorizontalScroll<HomeworkDetail> elements={homeworks}>
                {homework =>
                    <Homework
                        style={{
                            width: width || "100%",
                        }}
                        subject={homework.lesson.lessonData.course.subject}
                        information={homework.information}
                        id={homework.id}
                        creationDate={homework.createdAt}
                        dueDate={homework.dueDate}
                        completed={homework.userRelation.completed}
                        ignore={homework.userRelation.ignore}
                    />
                }
            </HorizontalScroll>
        </div>
    );
};

export default memo(Homeworks);
