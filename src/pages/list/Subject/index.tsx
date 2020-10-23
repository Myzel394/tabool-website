import React, {memo} from "react";
import DefaultPage from "components/pages/DefaultPage";

import SubjectManager from "./SubjectManager";

const Subject = () => {
    return (
        <DefaultPage>
            <SubjectManager />
        </DefaultPage>
    );
};

export default memo(Subject);
