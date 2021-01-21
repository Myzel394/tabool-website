import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {FCMNotification} from "types";
import camelcaseKeys from "camelcase-keys";
import {IconButton} from "@material-ui/core";
import {FaBookOpen} from "react-icons/all";

import {message} from "../firebase";
import {buildPath} from "../utils";

import useSnackbar from "./useSnackbar";

const useOnFCMMessageHandler = () => {
    const history = useHistory();
    const {addSnackbar} = useSnackbar();

    useEffect(() => {
        message.onMessage((rawNotification: FCMNotification) => {
            if (rawNotification.data?.payload) {
                try {
                    rawNotification.data.payload = JSON.parse(rawNotification.data.payload);
                    // eslint-disable-next-line no-empty
                } finally {}
            }

            const notification = camelcaseKeys(rawNotification, {deep: true});
            let variant = "info" as "info" | "error" | "success" | "warning" | "default";

            switch (notification.data?.type) {
                case "scooso_data_invalid":
                case "submission_scooso_upload_failed":
                    variant = "error";
                    break;
                case "submission_scooso_upload_succeeded":
                    variant = "success";
                    break;
            }

            addSnackbar(notification.notification.title, {
                variant,
                autoHideDuration: 10 * 1000,
                action() {
                    let link;

                    if (notification.data?.type) {
                        switch (notification.data.type) {
                            case "homework":
                                link = buildPath("/agenda/homework/detail/:id/", {
                                    id: notification.data.payload.id,
                                });
                                break;
                            case "scooso_data_invalid":
                                link = buildPath("/settings/change-scooso-credentials/");
                                break;
                            case "modification":
                                link = buildPath("/agenda/lesson/detail/:id/", {
                                    id: notification.data.payload.lessonId,
                                });
                                break;
                        }
                    }

                    if (link) {
                        return (
                            <IconButton
                                href={link}
                            >
                                <FaBookOpen />
                            </IconButton>
                        );
                    }
                    return null;
                }});
        });
    }, [addSnackbar, history]);
};

export default useOnFCMMessageHandler;
