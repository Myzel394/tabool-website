import React, {useContext} from "react";
import {Box, List} from "@material-ui/core";
import FlipMove from "react-flip-move";
import {StudentSubmissionListElement} from "components";
import update from "immutability-helper";

import SubmissionContext from "./SubmissionContext";


const SubmissionsList = () => {
    const {
        submissions,
        onSubmissionsChange,
    } = useContext(SubmissionContext);

    return (
        <Box mb={2}>
            <List>
                <FlipMove>
                    {submissions.map(submission =>
                        <div key={submission.id}>
                            <StudentSubmissionListElement
                                submission={submission}
                                onUpdate={newSubmission =>
                                    onSubmissionsChange(prevState => {
                                        const index = submissions.findIndex(givenSubmission => submission.id === givenSubmission.id);

                                        return update(prevState, {
                                            [index]: {
                                                $set: newSubmission,
                                            },
                                        });
                                    })}
                                onDelete={() => onSubmissionsChange(prevState => {
                                    const index = submissions.findIndex(givenSubmission => submission.id === givenSubmission.id);

                                    return update(prevState, {
                                        $splice: [
                                            [index, 1],
                                        ],
                                    });
                                })}
                            />
                        </div>)}
                </FlipMove>
            </List>
        </Box>
    );
};

export default SubmissionsList;
