import {ReactSVG} from "react-svg";
import {svgLogo} from "assets";
import React from "react";
import {Box} from "@material-ui/core";

const Logo = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <ReactSVG
                src={svgLogo}
                beforeInjection={(svg) =>
                    svg.setAttribute("style", "max-width: 10em;margin:0 auto;max-height: 200px")
                }
            />
        </Box>
    );
};

export default Logo;
