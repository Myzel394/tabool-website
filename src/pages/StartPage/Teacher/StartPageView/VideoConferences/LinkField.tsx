import React, {useState} from "react";
import {LinkTitleGrabber} from "components";
import {TextField} from "@material-ui/core";


export interface LinkFieldProps {
    isEditMode: boolean;
    onChange: (newValue: string) => any;
    value: string;
}

const LinkField = ({
    isEditMode,
    onChange,
    value,
}: LinkFieldProps) => {
    const [url, setUrl] = useState<string>(value);

    const submit = () => onChange(url);

    if (isEditMode) {
        return (
            <TextField
                inputRef={reference => {
                    if (reference) {
                        setTimeout(() => reference.focus(), 0);
                    }
                }}
                variant="outlined"
                margin="dense"
                type="url"
                value={url}
                name="lesson-video-conference-link"
                onKeyPress={event => {
                    if (event.key === "Enter" || event.keyCode === 13) {
                        event.preventDefault();
                        submit();
                    }
                }}
                onBlur={submit}
                onChange={event => setUrl(event.target.value)}
            />
        );
    } else {
        return (
            <LinkTitleGrabber>
                {value}
            </LinkTitleGrabber>
        );
    }
};
export default LinkField;

