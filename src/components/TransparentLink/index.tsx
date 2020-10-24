import React from "react";
import {Link, LinkProps} from "react-router-dom";
import clsx from "clsx";

import styles from "./TransparentLink.module.scss";

export type ITransparentLink = LinkProps;

const TransparentLink = ({children, className, ...other}: ITransparentLink) => {
    return (
        <Link {...other} className={clsx(styles.link, className)}>
            {children}
        </Link>
    );
};

export default TransparentLink;
