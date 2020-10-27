import React, {memo, ReactNode, useMemo} from "react";
import {Box, BoxProps, ListItem, ListItemIcon, ListItemProps, ListItemText, useTheme} from "@material-ui/core";
import {FaCheck} from "react-icons/all";
import tinycolor from "tinycolor2";

import styles from "./styles.module.scss";

export type ISimpleListField = BoxProps & {
    primaryText: string;

    isActive?: boolean;
    secondaryText?: string;

    left?: ReactNode;
    right?: ReactNode;

    listItemProps?: ListItemProps;
};

export const itemSize = 48 + 2 * 6 * 2;

const SimpleListField = ({
    isActive,
    primaryText,
    secondaryText,
    onClick,
    listItemProps,
    left,
    right,
    ...other}: ISimpleListField) => {
    const theme = useTheme();
    const isSelectedBackgroundColor = useMemo(() => {
        const {palette} = theme;
        const opacity = palette.action.activatedOpacity;
        const mainColor = palette.getContrastText(palette.background.default);
        const color = tinycolor(mainColor).setAlpha(opacity);

        return color.toString();
    }, [theme]);
    const boxStyle = useMemo(() => ({
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    }), [theme]);
    const styleProps = isActive ? {style: {backgroundColor: isSelectedBackgroundColor}} : {};
    const itemProps: any = {
        ...listItemProps,
        ...styleProps,
    };

    return (
        <Box
            marginY={2}
            style={boxStyle}
            {...other}
        >
            <ListItem
                {...itemProps}
                onClick={onClick}
            >
                {left}
                <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                />
                {right}
                {isActive &&
                    <ListItemIcon>
                        <FaCheck className={styles.icon} />
                    </ListItemIcon>
                }
            </ListItem>
        </Box>
    );
};

SimpleListField.defaultProps = {
    isActive: false,
    button: undefined,
    listItemProps: {},
};

export default memo(SimpleListField);
