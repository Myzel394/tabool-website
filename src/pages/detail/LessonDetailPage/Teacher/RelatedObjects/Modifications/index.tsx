import React, {useContext, useEffect, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    List,
    Typography,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdAdd} from "react-icons/all";

import RelatedObjectsContext from "../RelatedObjectsContext";

import AddModificationForm from "./AddModificationForm";
import Modification from "./Modification";

const Modifications = () => {
    const {t} = useTranslation();
    const {
        modifications,
    } = useContext(RelatedObjectsContext);

    const [isOpen, setIsOpen] = useState<boolean>(!modifications.length);

    useEffect(() => {
        if (!modifications.length) {
            setIsOpen(true);
        }
    }, [modifications.length]);

    return (
        <>
            <Typography variant="h2">
                {t("Veränderungen")}
            </Typography>
            <Box mt={2}>
                <List>
                    {modifications.map(modification =>
                        <Modification key={modification.id} modification={modification} />)}
                </List>
                <Accordion expanded={isOpen} onChange={() => setIsOpen(prevState => !prevState)}>
                    <AccordionSummary expandIcon={<MdAdd />}>
                        <Typography variant="button">
                            {t("Veränderung hinzufügen")}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AddModificationForm onAdd={() => setIsOpen(false)} />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </>
    );
};

export default Modifications;
