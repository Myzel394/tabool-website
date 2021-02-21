import React from "react";
import {Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {Transition} from "react-transition-group";
import {FaCaretDown} from "react-icons/all";
import {ButtonProps} from "@material-ui/core/Button";


export interface IShowMoreButton extends Omit<ButtonProps, "endIcon" | "children"> {
    showMore: boolean;

    showMoreText?: string;
    showLessText?: string;
}

const duration = 200;

const defaultStyle = {
    transition: `${duration}ms`,
    transform: "none",
};

const transitionStyles = {
    entering: {transform: "rotate(180deg)"},
    entered: {transform: "rotate(180deg)"},
    exiting: {transform: "rotate(360deg)"},
    exited: {transform: "none", transition: "0s"},
};

const ShowMoreButton = ({
    showLessText: givenShowLess,
    showMore,
    showMoreText: givenShowMore,
    ...other
}: IShowMoreButton) => {
    const {t} = useTranslation();
    const showMoreText = givenShowMore ?? t("Mehr anzeigen");
    const showLessText = givenShowLess ?? t("Weniger anzeigen");

    return (
        <Button
            {...other}
            endIcon={(
                <Transition in={showMore} timeout={duration}>
                    {state => <FaCaretDown style={{...defaultStyle, ...transitionStyles[state]}} />}
                </Transition>
            )}
        >
            {showMore ? showLessText : showMoreText}
        </Button>
    );
};
export default ShowMoreButton;


