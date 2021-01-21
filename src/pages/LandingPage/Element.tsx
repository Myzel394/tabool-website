import React, {ReactNode} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import {IconType} from "react-icons/lib";


export interface IElement {
    icon: IconType;
    title: string;
    children: ReactNode;
}

const SIZE = "1.5rem";

const Element = ({
    children,
    icon: Icon,
    title,
}: IElement) => {
    return (
        <>
            <Accordion elevation={0}>
                <AccordionSummary>
                    <ListItem>
                        <ListItemIcon>
                            <Icon size={SIZE} />
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails>
                    {children}
                </AccordionDetails>
            </Accordion>
            <Divider />
        </>
    );
};

export default Element;
