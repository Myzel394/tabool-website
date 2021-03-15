import React, {useState} from "react";
import {Collapse, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {ShowMoreButton} from "components";

const BottomContent = ({date}) => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);


    return (
        <>
            <Typography variant="h5">
                {date.format("LL")}
            </Typography>
            <Collapse in={isOpen}>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t("Tippe für mehr Infos")}
                </Typography>
            </Collapse>
            <ShowMoreButton showMore={isOpen} onClick={() => setIsOpen(prevState => !prevState)} />
        </>
    );
};

export default BottomContent;
