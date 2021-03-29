import * as yup from "yup";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";
import {ObjectShape} from "yup/lib/object";

const useSchema = (): yup.ObjectSchema<ObjectShape> => {
    const {t} = useTranslation();

    const schema = yup.object().shape({
        privateToStudentId: yup.string().nullable(),
        lesson: yup.object().typeError(t("Die Stunde wird benötigt.")).required(),
        information: yup.string().nullable(),
        type: yup.string().nullable(),
        dueDate: yup.date().min(dayjs(), "Das Fälligkeitsdatum kann nicht in der Vergangenheit liegen.").nullable(),
    });

    return schema;
};

export default useSchema;
