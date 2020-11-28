import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Box, CircularProgress, Typography} from "@material-ui/core";
import {MdArrowDownward} from "react-icons/all";
import {CSSTransition} from "react-transition-group";

import State from "./State";
import styles from "./DefaultPullToRefreshElement.module.scss";


export interface IDefaultPullToRefreshObject {
    state: State;
}

const DefaultPullToRefreshElement = ({state}: IDefaultPullToRefreshObject) => {
    const {t} = useTranslation();

    if (state === "done") {
        return null;
    }

    return (
        <Box
            height={80}
            py={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            {state !== "fetching" && (
                <Typography variant="h4">
                    <CSSTransition
                        in={state === "confirmed"}
                        classNames={{
                            enterActive: styles.on,
                            enterDone: styles.on,
                        }}
                        timeout={200}
                    >
                        <MdArrowDownward className={styles.container} />
                    </CSSTransition>
                </Typography>
            )}
            {state === "preview" && <Typography>{t("Ziehe runter um neu zu laden")}</Typography>}
            {state === "confirmed" && <Typography>{t("Lass jetzt los")}</Typography>}
            {state === "fetching" && (
                <>
                    <CircularProgress color="primary" />
                    <Typography>{t("Daten werden geladen")}</Typography>
                </>
            )}
        </Box>
    );
};

export default memo(DefaultPullToRefreshElement);
