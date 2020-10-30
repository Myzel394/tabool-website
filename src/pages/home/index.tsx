import React, {memo} from "react";

import TodayLesson from "./TodayLesson";

const Home = () => {
    return (
        <>
            <p>Homepage</p>
            <TodayLesson />
        </>
    );
};

export default memo(Home);
