import React, {useRef, useState} from "react";
import {FieldProps} from "formik";
import {Button, FormControl, FormHelperText} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import SelectModal, {ISelectModal} from "./SelectModal";


export type IBaseSearchField<DataType, KeyType extends string = string> =
    FieldProps &
    Omit<ISelectModal<DataType, KeyType>, "title" | "selectedKey" | "isOpen" | "onClose" | "renderElement" | "nullable" | "onSelect"> &
    {
    getCaption: (element: DataType) => string;

    helperText?: string;
    label?: string;
    required?: boolean;

    modalTitle: ISelectModal<DataType, KeyType>["title"];
    children: ISelectModal<DataType, KeyType>["renderElement"];
};


const BaseSearchField = <
    DataType extends any,
    KeyType extends string = string
    >({
        field,
        form,
        getCaption,
        helperText,
        label,
        required,
        modalTitle,
        getKeyFromElement,
        children: renderElement,
        ...other
    }: IBaseSearchField<DataType, KeyType>) => {
    const {t} = useTranslation();
    const error = form.touched[field.name] && form.touched[field.name];

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const $element = useRef<DataType>();

    return (
        <>
            <FormControl>
                <Button variant="outlined" onClick={() => setIsOpen(true)}>
                    {$element.current ? getCaption($element.current) : t("Auswählen")}
                </Button>
                <FormHelperText error={Boolean(error)}>
                    {error ?? helperText}
                </FormHelperText>
            </FormControl>
            <SelectModal
                {...other}
                getKeyFromElement={getKeyFromElement}
                nullable={!required}
                renderElement={renderElement}
                isOpen={isOpen}
                selectedKey={field.value}
                title={modalTitle}
                onClose={() => setIsOpen(false)}
                onSelect={element => {
                    setIsOpen(false);
                    field.onChange({
                        target: {
                            name: field.name,
                            value: getKeyFromElement(element),
                            element,
                        },
                    });
                }}
            />
        </>
    );
};

BaseSearchField.defaultProps = {
    getKeyFromElement: element => element.id,
};

export default BaseSearchField;
