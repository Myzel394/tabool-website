import React, {useContext} from "react";
import {Box, List} from "@material-ui/core";
import FlipMove from "react-flip-move";

import SubmissionContext from "../SubmissionContext";

import Submission from "./Submission";


const SubmissionsList = () => {
    const {
        submissions,
    } = useContext(SubmissionContext);

    return (
        <Box my={2}>
            <List>
                <FlipMove>
                    {submissions.map(submission =>
                        <div key={submission.id}>
                            <Submission submission={submission} />
                        </div>)}
                </FlipMove>
            </List>
        </Box>
    );
};

export default SubmissionsList;
