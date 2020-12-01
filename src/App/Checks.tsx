import React, {ReactNode} from "react";

export interface IChecks {
    children: ReactNode;
}

const Checks = ({children}: IChecks) => {
    return (
        <>
            {children}
        </>
    );
};

export default Checks;
