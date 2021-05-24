import React, {useContext} from "react";
import {List, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import RelatedObjectsContext from "../RelatedObjectsContext";

import Material from "./Material";
import UploadForm from "./UploadForm";

const Materials = () => {
    const {
        materials,
    } = useContext(RelatedObjectsContext);
    const {t} = useTranslation();

    return (
        <>
            <Typography variant="h2">
                {t("Materialien")}
            </Typography>
            <List>
                {materials.map(material =>
                    <Material
                        key={material.id}
                        material={material}
                    />)}
            </List>
            <UploadForm />
        </>
    );
};
export default Materials;

