import React from "react";
import {Link, LinkProps} from "@material-ui/core";
import {MdEmail} from "react-icons/all";
import createMailToLink from "mailto-link";
import {useEmailContacts, useSnackbar, useUser} from "hooks";
import {useTranslation} from "react-i18next";

import SecondaryButton from "./SecondaryButton";

export interface IIllEmailButton extends Omit<LinkProps, "href" | "component"> {}

const IllEmailButton = ({children, ...other}: IIllEmailButton) => {
    const {t} = useTranslation();
    const user = useUser();
    const contacts = useEmailContacts();
    const {addError} = useSnackbar();

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Link
            {...other}
            rel="noopener noreferrer"
            component={SecondaryButton}
            href={(contacts && user.data) && createMailToLink({
                to: contacts.illnessReportEmail,
                cc: [
                    contacts.mainTeacher.email,
                ],
                subject: "Entschuldigungs-Bescheid",
                body: `
                    Sehr geehrte Damen und Herren,
                    
                    leider kann ich heute nicht zur Schule kommen, da ich krank bin.
                    Ich entschuldige mich für das Fehlen.
                    
                    Mit freundlichen Grüßen
                    ${user.data.firstName} ${user.data.lastName}
                `,
            })}
            onClick={() => {
                if (!contacts || !user.data) {
                    addError(undefined, t("Konnte die Entschuldigungs-Emails nicht finden."));
                }
            }}
        >
            <MdEmail />
            {children}
        </Link>
    );
};

IllEmailButton.defaultProps = {
    children: "Entschuldigungs-Email schreiben",
};

export default IllEmailButton;
