import React, {ReactNode} from "react";
import {Avatar, ListItem, ListItemIcon, ListItemProps} from "@material-ui/core";
import {useContextEvent} from "hooks";
import {MdCheck} from "react-icons/all";

export interface AvailableListProps extends Omit<ListItemProps, "onClick"> {
    onClick: () => any;
}

export interface IElement<ElementType = any> {
    element: ElementType;
    renderIcon: (element: ElementType) => ReactNode;
    renderElement: (element: ElementType) => ReactNode;
    onContextEvent: () => any;
    onClick: () => any;
    isSelected: boolean;

    listItemProps?: AvailableListProps;
}

const Element = <ElementType extends any = any>({
    element,
    onContextEvent,
    renderIcon,
    renderElement,
    listItemProps,
    onClick,
    isSelected,
}: IElement<ElementType>) => {
    const contextProps = useContextEvent({
        onContextEvent,
        onClick,
    });

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: `button` prop indeed works
        <ListItem {...contextProps} {...listItemProps}>
            <ListItemIcon>
                {isSelected
                    ? (
                        <Avatar>
                            <MdCheck />
                        </Avatar>
                    )
                    : renderIcon(element)
                }
            </ListItemIcon>
            {renderElement(element)}
        </ListItem>
    );
};

export default Element;
