import React, {ReactNode, useState} from "react";
import {Box, Button, Collapse} from "@material-ui/core";


export interface IContent {
    children: ReactNode;
    title: string;

    link?: ReactNode;
    disableMargin?: boolean;
}

const Content = ({
    children,
    title,
    link,
    disableMargin,
}: IContent) => {
    const [show, setShow] = useState<boolean>(true);

    return (
        <>
            <Box my={1}>
                <Box my={1}>
                    <Button size="large" onClick={() => setShow(prevState => !prevState)}>
                        {title}
                    </Button>
                    {link}
                </Box>
            </Box>
            <Collapse in={show}>
                {disableMargin
                    ? children
                    : (
                        <Box ml={4} mr={2}>
                            {children}
                        </Box>
                    )
                }
            </Collapse>
        </>
    );
};

export default Content;
