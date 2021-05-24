import React from "react";
import {ListItem, ListItemText, useTheme} from "@material-ui/core";
import tinycolor from "tinycolor2";

import ActiveCheckIcon from "./ActiveCheckIcon";


export interface DefaultListItemFieldProps {
    isSelected: boolean;
    isParentSelected: boolean;
    onClick: () => any;

    mainColor?: string;

    primary: any;
    secondary?: any;
}

const DefaultListItemField = ({
    isParentSelected,
    isSelected,
    mainColor,
    onClick,
    primary,
    secondary,
}: DefaultListItemFieldProps) => {
    const theme = useTheme();

    return (
        <ListItem
            button
            style={{
                backgroundColor: (() => {
                    if (isSelected) {
                        if (mainColor) {
                            return tinycolor(mainColor)
                                .setAlpha(theme.palette.action.activatedOpacity)
                                .toString();
                        } else {
                            return tinycolor(theme.palette.text.hint)
                                .setAlpha(theme.palette.action.activatedOpacity)
                                .toString();
                        }
                    } else if (isParentSelected) {
                        return tinycolor(theme.palette.text.hint)
                            .setAlpha(theme.palette.action.hoverOpacity)
                            .toString();
                    } else {
                        return undefined;
                    }
                })(),
            }}
            onClick={onClick}
        >
            <ListItemText
                primary={primary}
                secondary={secondary}
            />
            {isSelected && <ActiveCheckIcon />}
        </ListItem>
    );
};

export default DefaultListItemField;
