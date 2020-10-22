import React, {memo, useMemo} from "react";
import {Box, BoxProps, ListItem, ListItemIcon, ListItemText, useTheme} from "@material-ui/core";
import {FaCheck} from "react-icons/all";
import tinycolor from "tinycolor2";

import styles from "./styles.module.scss";

export type ISimpleListField = BoxProps & {
    isActive: boolean;
    primaryText: string;
    secondaryText?: string;
};

const SimpleListField = ({isActive, primaryText, secondaryText, onClick, ...other}: ISimpleListField) => {
    const theme = useTheme();
    const isSelectedBackgroundColor = useMemo(() => {
        const {palette} = theme;
        const opacity = palette.action.activatedOpacity;
        const mainColor = palette.getContrastText(palette.background.default);
        const color = tinycolor(mainColor).setAlpha(opacity);

        return color.toString();
    }, [theme]);
    const listProps = isActive ? {style: {backgroundColor: isSelectedBackgroundColor}} : {};

    return (
        <Box marginY={2} {...other}>
            <ListItem
                {...listProps}
                button
                disableTouchRipple
                disableRipple
                onClick={onClick}
            >
                <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                />
                {isActive &&
                    <ListItemIcon>
                        <FaCheck className={styles.icon} />
                    </ListItemIcon>
                }
            </ListItem>
        </Box>
    );
};

export default memo(SimpleListField);
