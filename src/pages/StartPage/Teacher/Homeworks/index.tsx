import React from "react";
import {TeacherHomeworkDetail} from "types";
import {List} from "@material-ui/core";
import {ShowMoreArray, ShowMoreButton} from "components";

import Homework from "./Homework";


export interface IHomeworks {
    homeworks: TeacherHomeworkDetail[];
}

const Homeworks = ({
    homeworks,
}: IHomeworks) => {
    return (
        <List>
            <ShowMoreArray<TeacherHomeworkDetail>
                elements={homeworks}
                maxElements={4}
                renderButton={(isShown, update) =>
                    <ShowMoreButton showMore={isShown} onClick={update} />
                }
            >
                {homework => <Homework homework={homework} />}
            </ShowMoreArray>
        </List>
    );
};

export default Homeworks;
