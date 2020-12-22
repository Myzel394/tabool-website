import React, {useContext, useState} from "react";
import {Button, Typography} from "@material-ui/core";
import {usePrevious, useSnackbar} from "hooks";
import {ExtensionAvatar, LoadingOverlay, SelectList} from "components";
import prettyBytes from "pretty-bytes";
import {MdDeleteForever} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {IDelete, SubmissionDetail} from "types";
import CountUp from "react-countup";
import {useDeleteSubmissionAPI} from "hooks/apis";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {PredefinedMessageType} from "hooks/useSnackbar";
import update from "immutability-helper";

import SubmissionsContext from "../SubmissionsContext";

import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ElementManager from "./ElementManager";


const UploadedSubmissions = () => {
    const {t} = useTranslation();
    const {submissions, onSubmissionsChange} = useContext(SubmissionsContext);
    const {addError} = useSnackbar();
    const deleteSubmission = useDeleteSubmissionAPI();

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const fullSize = submissions.reduce<number>((value, submission) =>
        value + submission.size * Number(selectedKeys.includes(submission.id))
    , 0);
    const previousFullSize = usePrevious<number>(fullSize, 0);

    const {
        mutate,
        isLoading,
    } = useMutation<void, AxiosError, IDelete>(
        deleteSubmission,
        {
            onMutate: (variables) => {
                // Remove deleted keys from selected keys
                // No need to remove if no key is selected
                if (selectedKeys.length > 0) {
                    const keys = variables.ids;
                    const removeKeys = keys.reduce<string[]>((array, current) => {
                        if (selectedKeys.includes(current)) {
                            array.push(current);
                        }
                        return array;
                    }, []);
                    const newKeys = update(selectedKeys, {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore: Command does exist
                        $spliceDynamically: [
                            removeKeys,
                            (key: string, array: string[]) => array.indexOf(key),
                        ],
                    });
                    setSelectedKeys(newKeys);
                }

                // Hide dialog
                setConfirmDelete(false);
            },
            onSuccess: (x, variables) => {
                // Update submissions
                const newSubmissions = update(submissions, {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore: Command does exist
                    $spliceDynamically: [
                        variables.ids,
                        (key: string, arr: SubmissionDetail[]) => arr.findIndex(element => element.id === key),
                    ],
                });
                onSubmissionsChange(newSubmissions);
            },
            onError: error => addError(error, undefined, PredefinedMessageType.ErrorMutating),
        },
    );

    const filename = (() => {
        if (selectedKeys.length === 1) {
            const index = submissions.findIndex(element => element.id === selectedKeys[0]);
            const element = submissions[index];

            return element?.filename;
        }
        return null;
    })();
    const amount = selectedKeys.length;

    return (
        <>
            <LoadingOverlay isLoading={isLoading}>
                <SelectList<SubmissionDetail>
                    selectedKeys={selectedKeys}
                    data={submissions}
                    getElementKey={(submission: SubmissionDetail) => submission.id}
                    renderIcon={(submission: SubmissionDetail) =>
                        <ExtensionAvatar name={submission.filename} />
                    }
                    formFooter={
                        <>
                            {fullSize &&
                                <Typography color="textSecondary" variant="body2">
                                    {t("Größe aller Dateien: ")}
                                    <CountUp
                                        start={previousFullSize}
                                        end={fullSize}
                                        formattingFn={value => prettyBytes(value, {
                                            locale: "de",
                                        })}
                                        duration={0.8}
                                    />
                                </Typography>}
                        </>
                    }
                    formElements={[
                        <Button
                            key="delete_selected_submissions"
                            color="secondary"
                            startIcon={<MdDeleteForever />}
                            onClick={() => setConfirmDelete(true)}
                        >
                            {t("Löschen")}
                        </Button>,
                    ]}
                    renderElement={(submission: SubmissionDetail, iconElement) =>
                        <ElementManager
                            submission={submission}
                            iconElement={iconElement}
                            onDelete={() => mutate({
                                ids: [submission.id],
                            })}
                        />
                    }
                    onSelectedKeysChange={setSelectedKeys}
                />
            </LoadingOverlay>
            <DeleteConfirmDialog
                isOpen={confirmDelete}
                filename={filename}
                amount={amount}
                onConfirm={() => mutate({
                    ids: selectedKeys,
                })}
                onClose={() => setConfirmDelete(false)}
            />
        </>
    );
};

export default UploadedSubmissions;
