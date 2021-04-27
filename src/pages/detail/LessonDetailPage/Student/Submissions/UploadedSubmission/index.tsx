import React, {Dispatch, SetStateAction, useRef, useState} from "react";
import {Button, Typography} from "@material-ui/core";
import {usePrevious} from "hooks";
import {ExtensionAvatar, SelectList} from "components";
import prettyBytes from "pretty-bytes";
import {MdClear, MdCloudUpload, MdDeleteForever} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {StudentLessonDetail, StudentSubmissionDetail} from "types";
import CountUp from "react-countup";
import update from "immutability-helper";

import Element, {ElementReference} from "./Element";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import ResetUploadDateConfirmDialog from "./ResetUploadDateConfirmDialog";
import UploadConfirmDialog from "./UploadConfirmDialog";

export interface IUploadedSubmissions {
    submissions: StudentSubmissionDetail[];
    onChange: Dispatch<SetStateAction<StudentSubmissionDetail[]>>;
    lesson: StudentLessonDetail;
}

const UploadedSubmissions = ({
    onChange,
    submissions,
    lesson,
}: IUploadedSubmissions) => {
    const {t} = useTranslation();

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [confirmUpload, setConfirmUpload] = useState<boolean>(false);
    const [confirmResetUploadDates, setConfirmResetUploadDates] = useState<boolean>(false);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const $submissionsRef = useRef<Record<string, ElementReference>>({});

    const selectedSubmissionsRef = Object
        .entries($submissionsRef.current)
        .filter(([key]) => selectedKeys.includes(key))
        .map(([, value]) => value);
    const selectedSubmissions = submissions
        .filter(submission =>
            selectedKeys.includes(submission.id));
    const fullSize = selectedSubmissions
        .reduce((count, submission) =>
            count + submission.size, 0);

    const previousFullSize = usePrevious<number>(fullSize, 0);

    const resetKeys = () => setSelectedKeys([]);
    const findIndex = (submission: StudentSubmissionDetail): number =>
        submissions.findIndex(element => submission.id === element.id);

    const deleteSubmissions = () => {
        resetKeys();
        selectedSubmissionsRef.forEach(submission => submission.delete());
    };

    const resetUploadDates = () => {
        resetKeys();
        selectedSubmissionsRef.forEach(submission => submission.resetUploadDate());
    };

    const uploadNow = () => {
        resetKeys();
        selectedSubmissionsRef.forEach(submission => submission.upload());
    };

    const selectedAlreadyUploaded = selectedSubmissions.every(submission => submission.isUploaded);
    const selectedUploadDatesAlreadyNone = selectedSubmissions.every(submission => submission.isUploaded || !submission.publishDatetime);

    const dialogFilename = selectedSubmissions.length === 1 ? submissions[0].name : undefined;

    const updateSubmission = (submission: StudentSubmissionDetail): void => {
        const submissionIndex = findIndex(submission);
        const newSubmissions = update(submissions, {
            [submissionIndex]: {
                $set: submission,
            },
        });

        onChange(newSubmissions);
    };

    const deleteSubmission = (submission: StudentSubmissionDetail): void => {
        const submissionIndex = findIndex(submission);

        const newSubmissions = update(submissions, {
            $splice: [
                [submissionIndex, 1],
            ],
        });

        onChange(newSubmissions);
    };


    return (
        <>
            <SelectList<StudentSubmissionDetail>
                selectedKeys={selectedKeys}
                data={submissions}
                getElementKey={submission => submission.id}
                renderIcon={submission =>
                    <ExtensionAvatar
                        name={submission.name}
                        color={(() => {
                            if (!submission.publishDatetime) {
                                return "#888";
                            } else if (submission.isUploaded) {
                                return "#30d51f";
                            } else {
                                return "#ee581d";
                            }
                        })()}
                    />
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
                        key="upload_Selected_submissions"
                        startIcon={<MdClear />}
                        disabled={selectedUploadDatesAlreadyNone}
                        onClick={() => setConfirmResetUploadDates(true)}
                    >
                        {t("Hochldatedaten zurücksetzen")}
                    </Button>,
                    <Button
                        key="reset_publish_datetime_selected_submissions"
                        startIcon={<MdCloudUpload />}
                        disabled={selectedAlreadyUploaded}
                        onClick={() => setConfirmUpload(true)}
                    >
                        {t("Hochladen")}
                    </Button>,
                ]}
                renderElement={(submission, iconElement) =>
                    <Element
                        ref={(reference: ElementReference | null) => {
                            if (reference) {
                                $submissionsRef.current[submission.id] = reference;
                            }
                        }}
                        submission={submission}
                        iconElement={iconElement}
                        lesson={lesson}
                        onUpdate={async newSubmission => {
                            if (newSubmission) {
                                updateSubmission(newSubmission);
                            }
                        }}
                        onDeleted={() => deleteSubmission(submission)}
                    />
                }
                onSelectedKeysChange={setSelectedKeys}
            />
            <DeleteConfirmDialog
                isOpen={confirmDelete}
                filename={dialogFilename}
                amount={selectedKeys.length}
                onConfirm={() => {
                    setConfirmDelete(false);
                    deleteSubmissions();
                }}
                onClose={() => setConfirmDelete(false)}
            />
            <UploadConfirmDialog
                isOpen={confirmUpload}
                filename={dialogFilename}
                amount={selectedKeys.length}
                onConfirm={() => {
                    setConfirmUpload(false);
                    uploadNow();
                }}
                onClose={() => setConfirmDelete(false)}
            />
            <ResetUploadDateConfirmDialog
                isOpen={confirmResetUploadDates}
                filename={dialogFilename}
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
