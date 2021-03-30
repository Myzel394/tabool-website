import * as yup from "yup";
import {ObjectShape} from "yup/lib/object";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";

const useSchema = (): yup.ObjectSchema<ObjectShape> => {
    const {t} = useTranslation();

    const schema = yup.object().shape({
        information: yup.string().nullable(),
        date: yup
            .date()
            .min(dayjs(), t("Das Datum kann nicht in der Vergangenheit liegen."))
            .required(t("Das Datum wird benötigt.")),
        courseId: yup.string().required(t("Der Kurs wird benötigt.")),
        title: yup.string().required(t("Der Titel wird benötigt.")),
    });

    return schema;
};

export default useSchema;
