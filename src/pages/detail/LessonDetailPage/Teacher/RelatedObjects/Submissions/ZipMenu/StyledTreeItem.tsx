import React from "react";
import {TreeItem, TreeItemProps} from "@material-ui/lab";
import {makeStyles, Typography} from "@material-ui/core";
import {IconType} from "react-icons";
import {getExtension} from "utils";
import {EXTENSION_ICON_MAPPING} from "mappings";
import {FaFile} from "react-icons/all";

export interface StyledTreeItemProps extends TreeItemProps {
    text?: string;

    filename?: string;
    icon?: IconType;
    caption?: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.secondary,
    },
    content: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        "$expanded > &": {
            fontWeight: theme.typography.fontWeightRegular,
        },
    },
    group: {
        marginLeft: theme.spacing(3),
    },

    label: {
        fontWeight: "inherit",
        color: "inherit",
    },
    labelRoot: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
        marginRight: theme.spacing(1),
    },
    labelText: {
        fontWeight: "inherit",
        flexGrow: 1,
    },
}));

const StyledTreeItem = ({
    text,
    label,
    filename,
    caption,
    icon: ParentIcon,
    classes: parentClasses = {},
    ...other
}: StyledTreeItemProps) => {
    const classes = useStyles();
    const extension = filename && getExtension(filename);
    const Icon = ParentIcon || (extension && EXTENSION_ICON_MAPPING[extension]) || FaFile;

    return (
        <TreeItem
            label={label || (
                <div className={classes.labelRoot}>
                    <Icon className={classes.labelIcon} />
                    <Typography variant="body1" className={classes.labelText}>
                        {text}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {caption}
                    </Typography>
                </div>
            )}
            classes={{
                ...parentClasses,
                root: classes.root,
                content: classes.content,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
};

export default StyledTreeItem;
