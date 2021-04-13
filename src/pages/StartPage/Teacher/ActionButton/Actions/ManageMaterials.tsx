import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import {Alert} from "@material-ui/lab";
import {List} from "@material-ui/core";

import StartPageContext from "../../StartPageContext";

import Material from "./Material";


const ManageMaterials = () => {
    const {t} = useTranslation();
    const {
        selectedLesson,
        dailyData,
    } = useContext(StartPageContext);

    const materials = dailyData.materials.filter(material => material.lesson.id === selectedLesson!.id);

    if (!materials.length) {
        return (
            <Alert severity="info">
                {t("Keine Materialien verfügbar")}
            </Alert>
        );
    }

    return (
        <List>
            {materials.map(material => <Material key={material.id} material={material} />)}
        </List>
    );
};

export default ManageMaterials;
