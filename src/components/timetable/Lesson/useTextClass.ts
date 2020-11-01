import {useContext} from "react";
import tinycolor from "tinycolor2";
import clsx from "clsx";

import LessonContext from "./LessonContext";
import styles from "./LessonContent.module.scss";

const useTextClass = (): string => {
    const {color} = useContext(LessonContext);
    const specificClass = tinycolor(color).getLuminance() > 0.8 ? styles.darkText : styles.brightText;

    return clsx(specificClass, styles.text);
};

export default useTextClass;
