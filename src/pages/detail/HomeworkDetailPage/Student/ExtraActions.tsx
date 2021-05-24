import React, {useState} from "react";
import {Button, CircularProgress, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {MdDeleteForever, MdMoreVert} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {BottomSheetAction} from "components";
import {useDeleteStudentHomeworkAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {useSnackbar} from "hooks";
import {useHistory} from "react-router-dom";
import {PredefinedMessageType} from "hooks/useSnackbar";

export interface ExtraActionsProps {
    id: string;
    allow: boolean;
}

const ExtraActions = ({
    id,
    allow,
}: ExtraActionsProps) => {
    const {t} = useTranslation();
    const deleteHomework = useDeleteStudentHomeworkAPI();
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
                <ListItem button disabled={isLoading || !allow} onClick={mutate}>
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
