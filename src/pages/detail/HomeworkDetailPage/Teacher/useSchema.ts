import {useTranslation} from "react-i18next/src";
import * as yup from "yup";
import {ObjectShape} from "yup/lib/object";

const useSchema = (): yup.ObjectSchema<ObjectShape> => {
    const {t} = useTranslation();

    const schema = yup.object({
        information: yup.string().max(1023).nullable(),
        type: yup.string().nullable(),
        dueDate: yup.date().min(new Date(), t("Das Fälligkeitsdatum kann nicht in der Vergangenheit liegen.")),
    });

    return schema;
};

export default useSchema;
