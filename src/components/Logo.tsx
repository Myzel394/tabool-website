import {SimpleCenter} from "components";
import {ReactSVG} from "react-svg";
import {svgLogo} from "assets";
import React from "react";

const Logo = () => {
    return (
        <SimpleCenter>
            <ReactSVG
                src={svgLogo}
                beforeInjection={(svg) =>
                    svg.setAttribute("style", "max-width: 10em;margin:0 auto;max-height: 200px")
                }
            />
        </SimpleCenter>
    );
}

export default Logo;
