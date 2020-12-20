import React, {ReactNode, useMemo} from "react";
import {
    Avatar,
    Box,
    Checkbox,
    Collapse,
    FormControlLabel,
    Grid,
    List,
    ListItemIcon,
    ListItemProps,
    ListProps,
    Paper,
    useTheme,
} from "@material-ui/core";
import update from "immutability-helper";
import {MdCheck} from "react-icons/all";
import CardFlip from "react-card-flip";
import {useTranslation} from "react-i18next";

export interface AvailableListItemProps extends Omit<ListItemProps, "onClick"> {
    onClick: () => any;
    button: boolean;
}

export interface ISelectList<ElementType = any> {
    data: ElementType[];
    getElementKey: (element: ElementType) => string;
    selectedKeys: string[];
    onSelectedKeysChange: (selectedKeys: string[]) => any;

    renderIcon: (element: ElementType) => ReactNode;
    renderElement: (element: ElementType, iconElement: JSX.Element) => ReactNode;
    formElements: JSX.Element[];

    formFooter?: JSX.Element;
    listProps?: ListProps;
}

const SelectList = <ElementType extends any = any>({
    listProps,
    data,
    getElementKey,
    renderIcon,
    renderElement,
    formElements,
    formFooter,
    onSelectedKeysChange,
    selectedKeys,
}: ISelectList<ElementType>) => {
    const {t} = useTranslation();
    const theme = useTheme();

    const selectedAvatarStyle = useMemo(() => ({
        backgroundColor: theme.palette.primary.main,
    }), [theme.palette.primary.main]);
    const toggleKey = (targetedKey: string) => {
        const index = selectedKeys.indexOf(targetedKey);

        if (index === -1) {
            onSelectedKeysChange(update(selectedKeys, {
                $push: [targetedKey],
            }));
        } else {
            onSelectedKeysChange(update(selectedKeys, {
                $splice: [
                    [index, 1],
                ],
            }));
        }
    };

    const dataAmount = data.length;
    const selectedAmount = selectedKeys.length;
    const isSelectActive = selectedAmount > 0;

    return (
        <>
            <Collapse in={isSelectActive}>
                <Paper>
                    <Box p={2}>
                        <Grid container spacing={1} direction="row">
                            <Grid item xs={12}>
                                <FormControlLabel
                                    label={t("{{amount}} ausgewählt", {
                                        amount: selectedAmount,
                                    })}
                                    control={
                                        <Checkbox
                                            color="primary"
                                            indeterminate={selectedAmount > 0 && selectedAmount < dataAmount}
                                            checked={selectedAmount === dataAmount}
                                            onClick={() => {
                                                if (selectedAmount < dataAmount) {
                                                    onSelectedKeysChange(data.map(getElementKey));
                                                } else {
                                                    onSelectedKeysChange([]);
                                                }
                                            }}
                                        />
                                    }
                                />
                            </Grid>
                            {formFooter &&
                                <Grid item xs={12}>
                                    {formFooter}
                                </Grid>
                            }
                            {formElements.map(element =>
                                <Grid key={element.key} item xs={6} md={3}>
                                    {element}
                                </Grid>)}
                        </Grid>
                    </Box>
                </Paper>
            </Collapse>
            <List {...listProps}>
                {data.map(element => {
                    const key = getElementKey(element);
                    const isSelected = selectedKeys.includes(key);

                    return renderElement(
                        element,
                        (
                            <ListItemIcon
                                onClick={() => {
                                    toggleKey(key);
                                }}
                            >
                                <CardFlip
                                    isFlipped={isSelected}
                                    flipSpeedBackToFront={0.4}
                                    flipSpeedFrontToBack={0.4}
                                >
                                    {renderIcon(element)}
                                    <Avatar style={selectedAvatarStyle}>
                                        <MdCheck />
                                    </Avatar>
                                </CardFlip>
                            </ListItemIcon>
                        ),
                    );
                })}
            </List>
        </>
    );
};

export default SelectList;
