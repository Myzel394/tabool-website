import React, {useContext} from "react";
import {List, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {TeacherMaterialListElement} from "modules";
import update from "immutability-helper";

import RelatedObjectsContext from "../RelatedObjectsContext";

import UploadForm from "./UploadForm";

const Materials = () => {
    const {
        materials,
        updateLesson,
    } = useContext(RelatedObjectsContext);
    const {t} = useTranslation();

    return (
        <>
            <Typography variant="h2">
                {t("Materialien")}
            </Typography>
            <List>
                {materials.map(material =>
                    <TeacherMaterialListElement
                        key={material.id}
                        material={material}
                        onUpdate={newMaterial => updateLesson(prevState => {
                            const index = prevState.materials.findIndex(givenMaterial => givenMaterial.id === material.id);

                            return update(prevState, {
                                materials: {
                                    [index]: {
                                        $set: newMaterial,
                                    },
                                },
                            });
                        })}
                        onDelete={() => updateLesson(prevState => {
                            const index = prevState.materials.findIndex(givenMaterial => givenMaterial.id === material.id);

                            return update(prevState, {
                                materials: {
                                    $splice: [
                                        [index, 1],
                                    ],
                                },
                            });
                        })}
                    />)}
            </List>
            <UploadForm />
        </>
    );
};
export default Materials;

