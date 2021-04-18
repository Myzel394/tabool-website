import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {Button, CircularProgress, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDeleteForever, MdMoreVert} from "react-icons/all";
import {BottomSheetAction} from "components";
import {useSnackbar} from "hooks";
import {useDeleteTeacherExamAPI} from "hooks/apis";


export interface IExtraActions {
    id: string;
}

const ExtraActions = ({
    id,
}: IExtraActions) => {
    const {t} = useTranslation();
    const deleteHomework = useDeleteTeacherExamAPI();
    const {addError} = useSnackbar();
    const history = useHistory();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        mutate,
        isLoading,
    } = useMutation<void, AxiosError, any>(
        () => deleteHomework(id),
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
                        <MdDeleteForever size="1.5rem" />
                    </ListItemIcon>
                    <ListItemText
                        primary={t("Löschen")}
                    />
                    {isLoading && <CircularProgress color="inherit" size="1rem" />}
                </ListItem>
            </BottomSheetAction>
        </>
    );
};

export default ExtraActions;
