import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import {MdClose} from "react-icons/md";

import ConfirmationDialog from "./ConfirmationDialog";

export interface IBackButton {
    confirm: boolean;
}


const BackButton = ({confirm}: IBackButton) => {
    const history = useHistory();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const goBack = () => history.goBack();
    const handleButtonClick = () => {
        return confirm ? setIsOpen(true) : goBack();
    };

    return (
        <>
            <ConfirmationDialog
                open={isOpen}
                onConfirm={goBack}
                onCancel={() => setIsOpen(false)}
            />
            <IconButton color="default" onClick={handleButtonClick}>
                <MdClose />
            </IconButton>
        </>
    );
};

BackButton.defaultProps = {
    confirm: false,
};

export default memo(BackButton);
