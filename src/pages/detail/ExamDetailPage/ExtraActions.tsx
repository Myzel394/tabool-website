import React, {memo, useState} from "react";
import {Button, LinearProgress, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDeleteForever, MdMoreVert} from "react-icons/all";
import {BottomSheetAction} from "components";
import {ICON_SIZE} from "components/BottomSheetAction";
import {useTranslation} from "react-i18next";
import {useDeleteExamAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "hooks";


export interface IExtraActions {
    id: string;
}


const ExtraActions = ({
    id,
}: IExtraActions) => {
    const {t} = useTranslation();
    const deleteExam = useDeleteExamAPI();
    const {addError} = useSnackbar();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        mutate,
        isLoading,
    } = useMutation<void, AxiosError, any>(
        () => deleteExam(id),
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
                <ListItem button disabled={isLoading} onClick={mutate}>
                    <ListItemIcon>
                        <MdDeleteForever size={ICON_SIZE} />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Löschen")}
                    />
                    {isLoading && <LinearProgress />}
                </ListItem>
            </BottomSheetAction>
        </>
    );
};

export default memo(ExtraActions);
