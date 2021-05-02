import * as yup from "yup";
import {ObjectShape} from "yup/lib/object";

const useValidationSchema = (): yup.ObjectSchema<ObjectShape> =>
    yup.object({
        presenceContent: yup.string().nullable(),
        onlineContent: yup.string().nullable(),
        videoConferenceLink: yup.string().nullable(),
    });

export default useValidationSchema;
