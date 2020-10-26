import React, {memo} from "react";

import Title from "components/pages/FocusedPage/Title";

export interface IHeader {
    title: string;
}

const Header = ({title}: IHeader) => {
    return (
        <>
            <Title title={title} />
        </>
    );
};

export default memo(Header);
