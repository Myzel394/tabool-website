import React, {memo, ReactNode} from "react";
import {Box, List, Typography} from "@material-ui/core";

import BottomSheet from "./BottomSheet";

export interface BottomSheetActionProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;

    title?: string;
    description?: string;
}

const wordBreakStyle = {
    wordBreak: "break-all" as "break-all",
};

export const ICON_SIZE = "1.5rem";

const BottomSheetAction = ({
    title,
    description,
    isOpen,
    onClose,
    children,
}: BottomSheetActionProps) => {
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
        >
            {title && (
                <Box mt={2} mx={2}>
                    <Typography variant="h5" style={wordBreakStyle}>
                        {title}
                    </Typography>
                </Box>
            )}
            {description && (
                <Box mt={1} mb={2} mx={2}>
                    <Typography variant="body2" color="textSecondary" style={wordBreakStyle}>
                        {description}
                    </Typography>
                </Box>
            )}
            <List>
                {children}
            </List>
        </BottomSheet>
    );
};

export default memo(BottomSheetAction);
