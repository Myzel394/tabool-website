import React from "react";
import {StudentMaterialDetail} from "types";
import {buildPath, getPerUniqueValue, lazyDatetime} from "utils";
import {createStickyHeaderStyles} from "components";
import {Box, Divider, List, ListSubheader, useTheme} from "@material-ui/core";
import dayjs, {Dayjs} from "dayjs";

import File from "./File";


export interface IMaterials {
    materials: StudentMaterialDetail[];
}

// A divider should be placed between non-available and available materials.
const shouldDividerBeHere = (currentDate: Dayjs, nextDate: Dayjs | void): boolean => {
    const today = dayjs();

    return Boolean(currentDate.isBefore(today) && nextDate && nextDate.isAfter(today));
};

const getFirstMaterialDate = (materials: StudentMaterialDetail[]): Dayjs => materials[0].publishDatetime;
const getLastMaterialDate = (materials?: StudentMaterialDetail[]): Dayjs | void => {
    if (!materials?.length) {
        return;
    }

    const lastElement = materials[materials.length - 1];

    return lastElement.publishDatetime;
};

const Materials = ({
    materials,
}: IMaterials) => {
    const theme = useTheme();
    const classes = createStickyHeaderStyles(theme.palette.background.default);
    const materialsPerDate = getPerUniqueValue(materials, {
        getKey: material => lazyDatetime(material.publishDatetime, "date"),
    });
    const materialsEntries = Object.entries(materialsPerDate);

    return (
        <List className={classes.root} subheader={<li />}>
            {materialsEntries.map(([dateAsStr, materials], index) =>
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
                    {shouldDividerBeHere(
                        // dateAsStr only checks date-based.
                        // When a material is today at a specific time available, the divider would be wrongly placed.
                        // That's why we need to get the exact date with time.
                        getFirstMaterialDate(materials),
                        getLastMaterialDate(materialsEntries[index + 1]?.[1]),
                    ) && (
                        <Box my={3}>
                            <Divider />
                        </Box>
                    )}
                </li>)}
        </List>
    );
};
export default Materials;


