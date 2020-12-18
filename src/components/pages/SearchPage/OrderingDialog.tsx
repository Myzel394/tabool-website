import React, {memo} from "react";
import {Dialog, DialogActions, DialogTitle, Grid, List, ListItem, Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {MdArrowDownward, MdArrowUpward} from "react-icons/all";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";

import {PrimaryButton} from "../../buttons";

interface OrderingType {
    value: any;
    name: string;
}

export interface IOrderingDialog {
    isOpen: boolean;
    onClose: () => any;
    orderings: OrderingType[];
    value: any;
    onValueChange: (value: any) => any;
}

const OrderingDialog = ({
    isOpen,
    onClose,
    orderings,
    value,
    onValueChange,
}: IOrderingDialog) => {
    const {t} = useTranslation();

    return (
        <Dialog open={isOpen} onBackdropClick={onClose}>
            <DialogTitle>
                {t("Sortieren")}
            </DialogTitle>
            <List>
                {orderings.map(ordering => (
                    <ListItem key={ordering.value}>
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
                    </ListItem>
                ))}
            </List>
            <DialogActions>
                <PrimaryButton onClick={onClose}>
                    {t("Schließen")}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default memo(OrderingDialog);
