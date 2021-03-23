import React from "react";
import {UserStudentInformation} from "types";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import {MdEmail} from "react-icons/all";
import createMailToLink from "mailto-link";
import {useTranslation} from "react-i18next";


export interface IStudentInformation extends UserStudentInformation {

}


const StudentInformation = ({
    mainTeacher,
}: IStudentInformation) => {
    const {t} = useTranslation();

    return (
        <Card>
            <CardContent>
                {/* eslint-disable-next-line @shopify/jsx-no-hardcoded-content */}
                <Typography variant="h5" component="h2">
                    {`${mainTeacher.firstName} ${mainTeacher.lastName}`}
                </Typography>
                <Typography color="textSecondary">
                    {mainTeacher.shortName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    startIcon={<MdEmail />}
                    href={createMailToLink({
                        to: mainTeacher.email,
                    })}
                >
                    {t("E-Mail schreiben")}
                </Button>
            </CardActions>
        </Card>
    );
};
export default StudentInformation;


