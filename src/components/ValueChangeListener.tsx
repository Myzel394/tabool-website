import {useFormikContext} from "formik";
import _ from "lodash";
import {useEffect} from "react";

export interface IValueChangeListener {
    targetedKeys: string[];
}

const ValueChangeListener = ({
    targetedKeys,
}: IValueChangeListener) => {
    const {submitForm, values} = useFormikContext();
    const targeted = _.values(_.pick(values, targetedKeys));

    useEffect(() => {
        submitForm();
    }, [targeted, submitForm]);

    return null;
};

export default ValueChangeListener;
