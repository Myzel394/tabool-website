import React, {ReactNode} from "react";
import {Box} from "@material-ui/core";

import styles from "./BasePage.module.scss";

export interface IBasePage {
    children: ReactNode;
}

const BasePage = ({children}: IBasePage) => {
    return (
        <Box className={styles.container}>
            {children}
        </Box>
    );
};

export default BasePage;
