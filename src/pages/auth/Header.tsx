import React, {memo} from "react";
import {ReactSVG} from "react-svg";
import {SimpleCenter} from "components";
import {svgLogo} from "assets";

import Title from "../../components/pages/FocusedPage/Title";

export interface IHeader {
    title: string;
}

const Header = ({title}: IHeader) => {
    return (
        <>
            <SimpleCenter>
                <ReactSVG
                    src={svgLogo}
                    beforeInjection={(svg) =>
                        svg.setAttribute("style", "max-width: 10em;margin:0 auto;max-height: 200px")
                    }
                />
            </SimpleCenter>
            <Title title={title} />
        </>
    );
};

export default memo(Header);
