import React, {memo, ReactNode} from "react";
import {Box, List, Typography} from "@material-ui/core";

import BottomSheet from "./BottomSheet";

export interface IBottomSheetAction {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;

    title?: string;
}

const wordBreakStyle = {
    wordBreak: "break-all" as "break-all",
};

const BottomSheetAction = ({
    title,
    isOpen,
    onClose,
    children,
}: IBottomSheetAction) => {
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
        >
            {title &&
                <Box m={2}>
                    <Typography variant="h5" style={wordBreakStyle}>
                        {title}
                    </Typography>
                </Box>}
            <List>
                {children}
            </List>
        </BottomSheet>
    );
};

export default memo(BottomSheetAction);
