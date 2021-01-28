import React, {useContext, useRef, useState} from "react";
import {Button, Typography} from "@material-ui/core";
import {usePrevious} from "hooks";
import {ExtensionAvatar, SelectList} from "components";
import prettyBytes from "pretty-bytes";
import {MdClear, MdCloudUpload, MdDeleteForever} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {SubmissionDetail} from "types";
import CountUp from "react-countup";
import update from "immutability-helper";

import SubmissionsContext from "../SubmissionsContext";

import Element, {ElementReference} from "./Element";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import UploadConfirmDialog from "./UploadConfirmDialog";
import ResetUploadDateConfirmDialog from "./ResetUploadDateConfirmDialog";


const UploadedSubmissions = () => {
    const {t} = useTranslation();
    const {submissions, onSubmissionsChange} = useContext(SubmissionsContext);

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [confirmUpload, setConfirmUpload] = useState<boolean>(false);
    const [confirmResetUploadDates, setConfirmResetUploadDates] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const $submissionsRef = useRef<Record<string, ElementReference>>({});

    const selectedSubmissionsRef = Object
        .entries($submissionsRef.current)
        .filter(([key, x]) => selectedKeys.includes(key))
        .map(([x, value]) => value);
    const selectedSubmissions = submissions
        .filter(submission =>
            selectedKeys.includes(submission.id));
    const fullSize = selectedSubmissions
        .reduce((count, submission) =>
            count + submission.size, 0);

    const previousFullSize = usePrevious<number>(fullSize, 0);

    const resetKeys = () => setSelectedKeys([]);
    const findIndex = (submission: SubmissionDetail): number =>
        submissions.findIndex(element => submission.id === element.id);

    const deleteSubmissions = () => {
        resetKeys();
        selectedSubmissionsRef.forEach(submission => submission.delete());
    };

    const uploadSubmissions = () => {
        resetKeys();
        selectedSubmissionsRef.forEach(submission => submission.upload());
    };

    const resetUploadDates = () => {
        resetKeys();
        selectedSubmissionsRef.forEach(submission => submission.resetUploadDate());
    };

    const selectedAlreadyUploaded = selectedSubmissions.every(submission => submission.isUploaded);
    const selectedUploadDatesAlreadyNone = selectedSubmissions.every(submission => submission.isUploaded || !submission.uploadDate);

    return (
        <>
            <SelectList<SubmissionDetail>
                selectedKeys={selectedKeys}
                data={submissions}
                getElementKey={(submission: SubmissionDetail) => submission.id}
                renderIcon={(submission: SubmissionDetail) =>
                    <ExtensionAvatar name={submission.filename} />
                }
                formFooter={
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
                    </Typography>
                }
                formElements={[
                    <Button
                        key="delete_selected_submissions"
                        startIcon={<MdDeleteForever />}
                        onClick={() => setConfirmDelete(true)}
                    >
                        {t("Löschen")}
                    </Button>,
                    <Button
                        key="upload_selected_submissions"
                        startIcon={<MdCloudUpload />}
                        disabled={selectedAlreadyUploaded}
                        onClick={() => setConfirmUpload(true)}
                    >
                        {t("Hochladen")}
                    </Button>,
                    <Button
                        key="upload_selected_submissions"
                        startIcon={<MdClear />}
                        disabled={selectedUploadDatesAlreadyNone}
                        onClick={() => setConfirmResetUploadDates(true)}
                    >
                        {t("Datum zurücksetzen")}
                    </Button>,
                ]}
                renderElement={(submission: SubmissionDetail, iconElement) =>
                    <Element
                        ref={(reference: ElementReference | null) => {
                            if (reference) {
                                $submissionsRef.current[submission.id] = reference;
                            }
                        }}
                        submission={submission}
                        iconElement={iconElement}
                        onUploaded={async didChange => {
                            if (didChange) {
                                const submissionIndex = findIndex(submission);
                                const newSubmissions = update(submissions, {
                                    [submissionIndex]: {
                                        isUploaded: {
                                            $set: true,
                                        },
                                    },
                                });

                                onSubmissionsChange(newSubmissions);
                            }
                        }}
                        onUpdate={async newSubmission => {
                            if (newSubmission) {
                                const submissionIndex = findIndex(submission);
                                const newSubmissions = update(submissions, {
                                    [submissionIndex]: {
                                        $set: newSubmission,
                                    },
                                });

                                onSubmissionsChange(newSubmissions);
                            }
                        }}
                        onDeleted={async () => {
                            const submissionIndex = findIndex(submission);
                            const newSubmissions = update(submissions, {
                                $splice: [
                                    [submissionIndex, 1],
                                ],
                            });

                            onSubmissionsChange(newSubmissions);
                        }}
                    />
                }
                onSelectedKeysChange={setSelectedKeys}
            />
            <DeleteConfirmDialog
                isOpen={confirmDelete}
                filename={selectedSubmissions.length === 1 ? submissions[0].filename : undefined}
                amount={selectedKeys.length}
                onConfirm={() => {
                    setConfirmDelete(false);
                    deleteSubmissions();
                }}
                onClose={() => setConfirmDelete(false)}
            />
            <UploadConfirmDialog
                isOpen={confirmUpload}
                filename={selectedSubmissions.length === 1 ? submissions[0].filename : undefined}
                amount={selectedKeys.length}
                onConfirm={() => {
                    setConfirmUpload(false);
                    uploadSubmissions();
                }}
                onClose={() => setConfirmUpload(false)}
            />
            <ResetUploadDateConfirmDialog
                isOpen={confirmResetUploadDates}
                filename={selectedSubmissions.length === 1 ? submissions[0].filename : undefined}
                amount={selectedKeys.length}
                onConfirm={() => {
                    setConfirmResetUploadDates(false);
                    resetUploadDates();
                }}
                onClose={() => setConfirmResetUploadDates(false)}
            />
        </>
    );
};

export default UploadedSubmissions;
