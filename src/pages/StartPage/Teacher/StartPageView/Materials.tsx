import React, {useContext} from "react";
import {getPerUniqueValue, lazyDatetime} from "utils";
import {Box, Divider, List, ListSubheader, useTheme} from "@material-ui/core";
import dayjs from "dayjs";
import {createStickyHeaderStyles, TeacherMaterialListElement} from "components";
import sortArray from "sort-array";
import FlipMove from "react-flip-move";
import update from "immutability-helper";

import StartPageContext from "../StartPageContext";


const Materials = () => {
    const theme = useTheme();
    const {
        dailyData: {materials},
        onDailyDataChange,
    } = useContext(StartPageContext);

    const classes = createStickyHeaderStyles(theme.palette.background.default);
    const materialsPerDate = getPerUniqueValue(materials, {
        getKey: material => lazyDatetime(material.publishDatetime, "date") ?? "",
    });
    const materialsEntries = Object.entries(materialsPerDate);
    const sortedMaterialsValues = materialsEntries.map(([key, value]) =>
        [key, sortArray(value, {
            by: "publishDatetime",
        })]);
    const sortedMaterialsEntries = sortArray(sortedMaterialsValues, {
        by: 0,
    });

    return (
        <List className={classes.root} subheader={<li />}>
            <FlipMove>
                {sortedMaterialsEntries.map(([dateAsStr, materials], index) =>
                    <li key={dateAsStr} className={classes.liItem}>
                        <ul>
                            <ListSubheader>{dayjs(dateAsStr).format("LL")}</ListSubheader>
                            <FlipMove>
                                {materials.map(material =>
                                    <div key={material.id}>
                                        <TeacherMaterialListElement
                                            material={material}
                                            onUpdate={newMaterial => onDailyDataChange(dailyData => update(dailyData, {
                                                materials: {
                                                    $splice: [
                                                        [dailyData.materials.findIndex(material => material.id === newMaterial.id), 1, newMaterial],
                                                    ],
                                                },
                                            }))}
                                            onDelete={() => onDailyDataChange(dailyData => {
                                                const index = dailyData.materials.findIndex(givenMaterial => givenMaterial.id === material.id);

                                                return update(dailyData, {
                                                    materials: {
                                                        $splice: [
                                                            [index, 1],
                                                        ],
                                                    },
                                                });
                                            })}
                                        />
                                    </div>)}
                            </FlipMove>
                        </ul>
                        {index < sortedMaterialsEntries.length && (
                            <Box my={3}>
                                <Divider />
                            </Box>
                        )}
                    </li>)}
            </FlipMove>
        </List>
    );
};

export default Materials;