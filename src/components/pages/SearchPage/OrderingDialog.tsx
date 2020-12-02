import React, {memo} from "react";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdArrowDownward, MdArrowUpward, MdSort} from "react-icons/all";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

import {PrimaryButton} from "../../buttons";

export interface IOrderingDialog {
    isOpen: boolean;
    onClose: () => any;
    orderings: {
        value: string;
        name: string;
    }[];
    value: string;
    onValueChange: (value: string) => any;
}

const OrderingDialog = ({isOpen, onClose, orderings, value, onValueChange}: IOrderingDialog) => {
    const {t} = useTranslation();

    return (
        <Dialog open={isOpen} onBackdropClick={onClose}>
            <DialogTitle>
                <MdSort />
                {t("Sortieren")}
            </DialogTitle>
            <DialogContent>
                {orderings.map(ordering => (
                    <Box key={ordering.value} display="flex" flexDirection="row">
                        <Typography variant="body1" color="textSecondary">
                            <Grid container spacing={3} direction="row" alignItems="center">
                                <Grid item>
                                    {ordering.name}
                                </Grid>
                                <Grid item>
                                    <ToggleButtonGroup>
                                        <ToggleButton
                                            color="default"
                                            selected={value === ordering.value}
                                            onClick={() => onValueChange(value.replace(/-/, ""))}
                                        >
                                            <MdArrowUpward />
                                        </ToggleButton>
                                        <ToggleButton
                                            color="default"
                                            selected={value === `-${ordering.value}`}
                                            onClick={() => onValueChange(`-${value}`)}
                                        >
                                            <MdArrowDownward />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </Typography>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <PrimaryButton onClick={onClose}>
                    {t("Schließen")}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default memo(OrderingDialog);
