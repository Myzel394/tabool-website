import React, {memo, useState} from "react";
import {Button, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDeleteForever, MdMoreVert} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {BottomSheet} from "components";


export interface IExtraActions {
    id: string;
}
const iconSize = "1.5rem";


const ExtraActions = ({
    id,
}: IExtraActions) => {
    const {t} = useTranslation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    // TODO: Add BottomSheetAction component!
    return (
        <>
            <Button startIcon={<MdMoreVert />} onClick={() => setIsOpen(true)}>
                {t("Einstellungen")}
            </Button>
            <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <MdDeleteForever size={iconSize} />
                        </ListItemIcon>
                        <ListItemText
                            primary={t("Löschen")}
                        />
                    </ListItem>
                </List>
            </BottomSheet>
        </>
    );
};

export default memo(ExtraActions);
