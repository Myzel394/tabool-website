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

    const childrenWrapper = (
        <Box display="flex" flexDirection="column">
            {children}
        </Box>
    );

    return (
        <section>
            <Box my={2} ml={disableMargin ? 2 : 0} component="h2">
                <Button
                    size="large"
                    onClick={() => setShow(prevState => !prevState)}
                >
                    {title}
                </Button>
                {link}
            </Box>
            <Collapse in={show}>
                {disableMargin
                    ? childrenWrapper
                    : (
                        <Box ml={4} mr={2}>
                            {childrenWrapper}
                        </Box>
                    )
                }
            </Collapse>
        </section>
    );
};

export default Content;
