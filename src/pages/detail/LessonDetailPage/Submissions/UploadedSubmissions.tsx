import React, {memo} from "react";
import {SubmissionDetail} from "types";
import {List} from "@material-ui/core";

import SubmissionElement from "./SubmissionElement";

export interface IUploadedSubmissions {
    submissions: SubmissionDetail[];
}

const UploadedSubmissions = ({submissions}: IUploadedSubmissions) => {
    return (
        <List>
            {submissions.map(submission =>
                <SubmissionElement
                    key={`uploaded_submission_${submission.id}`}
                    filename={submission.filename}
                    fileSize={submission.size}
                    fileSettings={{
                        uploadDate: submission.uploadAt,
                    }}
                    onSettingsChange={}
                    onDelete={() => null}
                />)}
        </List>
    );
};

export default memo(UploadedSubmissions);
