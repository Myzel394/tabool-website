import React, {memo, useState} from "react";
import {Button, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDeleteForever, MdMoreVert} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {BottomSheetAction} from "components";
import {ICON_SIZE} from "components/BottomSheetAction";
import {useDeleteHomeworkAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {useHistory} from "react-router-dom";

import {PredefinedMessageType} from "../../../hooks/useSnackbar";


export interface IExtraActions {
    id: string;
}


const ExtraActions = ({
    id,
}: IExtraActions) => {
    const {t} = useTranslation();
    const deleteHomework = useDeleteHomeworkAPI();
    const {addError} = useSnackbar();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        mutate,
    } = useMutation<void, AxiosError, string>(
        deleteHomework,
        {
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
            onSuccess: () => history.goBack(),
        },
    );

    return (
        <>
            <Button startIcon={<MdMoreVert />} onClick={() => setIsOpen(true)}>
                {t("Einstellungen")}
            </Button>
            <BottomSheetAction
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <ListItem button onClick={() => mutate(id)}>
                    <ListItemIcon>
                        <MdDeleteForever size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Löschen")}
                    />
                </ListItem>
            </BottomSheetAction>
        </>
    );
};

export default memo(ExtraActions);
