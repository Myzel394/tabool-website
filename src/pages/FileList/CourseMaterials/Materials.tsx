import React from "react";
import {StudentMaterialDetail} from "types";
import {buildPath, getPerUniqueValue, lazyDatetime} from "utils";
import {createStickyHeaderStyles} from "components";
import {List, ListSubheader, useTheme} from "@material-ui/core";
import dayjs from "dayjs";

import File from "./File";


export interface IMaterials {
    materials: StudentMaterialDetail[];
}

const Materials = ({
    materials,
}: IMaterials) => {
    const theme = useTheme();
    const classes = createStickyHeaderStyles(theme.palette.background.default);
    const materialsPerDate = getPerUniqueValue(materials, {
        getKey: material => lazyDatetime(material.publishDatetime, "date"),
    });

    return (
        <List className={classes.root} subheader={<li />}>
            {Object.entries(materialsPerDate).map(([dateAsStr, materials]) =>
                <li key={dateAsStr} className={classes.liItem}>
                    <ul>
                        <ListSubheader>{dayjs(dateAsStr).format("LL")}</ListSubheader>
                        {materials.map(material =>
                            <div key={material.id}>
                                <File
                                    id={material.id}
                                    name={material.name}
                                    size={material.size}
                                    file={material.file}
                                    publishDatetime={material.publishDatetime}
                                    lessonUrl={buildPath("/agenda/lesson/detail/:id/:date/", {
                                        id: material.lesson.id,
                                        date: lazyDatetime(material.lessonDate, "date"),
                                    })}
                                />
                            </div>)}
                    </ul>
                </li>)}
        </List>
    );
};
export default Materials;


