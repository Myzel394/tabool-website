import React, {useEffect, useState} from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {ToggleButton} from "@material-ui/lab";
import {MdEdit} from "react-icons/all";

import {Form} from "../DetailContext";

export interface IContent {
    icon: JSX.Element;
    title: string;
    information: string;

    forceEdit: boolean;

    form?: Form;
    onEditModeLeft?: () => any;
}

const Content = ({form, icon, information, title, forceEdit, onEditModeLeft}: IContent) => {
    const [isEditActive, setIsEditActive] = useState<boolean>(false);

    // Force edit mode
    useEffect(() => {
        if (forceEdit && !isEditActive) {
            setIsEditActive(true);
        }
    }, [forceEdit, isEditActive]);

    return (
        <Box px={2} width="100%">
            <Grid
                container spacing={2} direction="column"
            >
                <Grid item>
                    <Typography
                        component="dt"
                        variant="h5"
                        color="textSecondary"
                    >
                        <Box display="flex" flexDirection="row" alignItems="center">
                            {icon}
                            <Box ml={1} component="span">
                                {title}
                            </Box>
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid container spacing={1} justify="space-between" alignItems="center">
                        <Grid item>
                            {isEditActive ? form?.input : (
                                <Typography
                                    component="dd"
                                    variant="body1"
                                >
                                    {information}
                                </Typography>
                            )}
                        </Grid>
                        {form && (
                            <Grid item>
                                <ToggleButton
                                    selected={isEditActive}
                                    disabled={forceEdit}
                                    onChange={() => setIsEditActive(prevState => {
                                        const value = !prevState;
                                        if (!value) {
                                            if (onEditModeLeft) {
                                                onEditModeLeft();
                                            }
                                        }
                                        return value;
                                    })}
                                >
                                    <MdEdit />
                                </ToggleButton>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

Content.defaultProps = {
    forceEdit: false,
};

export default Content;
