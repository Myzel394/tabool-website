import React, {useContext} from "react";
import {
    CircularProgress,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch,
} from "@material-ui/core";
import {MdFileUpload} from "react-icons/all";
import {TeacherMaterialDetail} from "types";
import {IUpdateTeacherMaterialData, useUpdateTeacherMaterialAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import dayjs from "dayjs";
import update from "immutability-helper";

import StartPageContext from "../../StartPageContext";


export interface MaterialProps {
    material: TeacherMaterialDetail;
}

const Material = ({
    material,
}: MaterialProps) => {
    const {
        onDailyDataChange,
    } = useContext(StartPageContext);
    const updateMaterial = useUpdateTeacherMaterialAPI();

    const {
        mutateAsync,
        isLoading,
    } = useMutation<TeacherMaterialDetail, AxiosError, IUpdateTeacherMaterialData>(
        values => updateMaterial(material.id, values),
        {
            onSuccess: newMaterial => onDailyDataChange(dailyData => update(dailyData, {
                materials: {
                    $splice: [
                        [dailyData.materials.findIndex(material => material.id === newMaterial.id), 1, newMaterial],
                    ],
                },
            })),
        },
    );

    const isPublished = Boolean(material.publishDatetime && material.publishDatetime.isBefore(dayjs()));

    return (
        <ListItem>
            <ListItemIcon>
                <Switch
                    disabled={material.announce || isLoading || isPublished}
                    checked={material.announce}
                    onClick={() => mutateAsync({
                        announce: !material.announce,
                    })}
                />
            </ListItemIcon>
            <ListItemText
                primary={material.name}
                secondary={material.publishDatetime?.format?.("LLL")}
            />
            {isLoading ? <CircularProgress color="inherit" size="1rem" /> : (
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        disabled={isLoading || isPublished}
                        onClick={() => mutateAsync({
                            publishDatetime: dayjs(),
                        })}
                    >
                        <MdFileUpload />
                    </IconButton>
                </ListItemSecondaryAction>
            )}
        </ListItem>
    );
};

export default Material;
