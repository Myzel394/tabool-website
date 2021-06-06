import React, {useContext} from "react";
import {IconButton, ListItem, ListItemSecondaryAction} from "@material-ui/core";
import {LoadingOverlay} from "components";
import {MdDeleteForever} from "react-icons/all";
import {TeacherModificationDetail} from "types";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import update from "immutability-helper";
import {PredefinedMessageType} from "hooks/useSnackbar";
import {useSnackbar} from "hooks";
import {useDeleteTeacherModificationAPI} from "hooks/apis";

import RelatedObjectsContext from "../RelatedObjectsContext";
import {SingleModification} from "../../../../../../modules";

export interface ModificationProps {
    modification: TeacherModificationDetail;
}

const Modification = ({
    modification,
}: ModificationProps) => {
    const {
        updateLesson,
    } = useContext(RelatedObjectsContext);
    const {addError} = useSnackbar();
    const deleteModification = useDeleteTeacherModificationAPI();

    const {
        mutateAsync,
        isLoading,
    } = useMutation<void, AxiosError, void>(
        () => deleteModification(modification.id),
        {
            onSuccess: () =>
                updateLesson(prevState => {
                    const index = prevState.modifications.findIndex(checkModification => checkModification.id === modification.id);

                    return update(prevState, {
                        modifications: {
                            $splice: [
                                [index, 1],
                            ],
                        },
                    });
                }),
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    return (
        <LoadingOverlay isLoading={isLoading}>
            <ListItem key={modification.id}>
                <SingleModification
                    modificationType={modification.modificationType}
                    subject={modification.lesson.course.subject}
                    newSubject={modification.newSubject}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => mutateAsync()}>
                        <MdDeleteForever />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </LoadingOverlay>
    );
};

export default Modification;
