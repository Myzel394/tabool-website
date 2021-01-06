import React, {useEffect, useState} from "react";
import {FieldProps} from "formik";
import {Button, CircularProgress, FormControl, FormHelperText} from "@material-ui/core";
import {useTranslation} from "react-i18next";

import SelectModal, {ISelectModal} from "./SelectModal";


export type IBaseSearchField<DataType, DetailedDataType = DataType, KeyType extends string = string> =
    FieldProps &
    Omit<ISelectModal<DataType, KeyType>, "nullable" | "renderElement" | "isOpen" | "selectedKey" | "title" | "onClose" | "onSelect">
    & {
    getCaption: (element: DetailedDataType) => string;

    helperText?: string;
    label?: string;
    required?: boolean;

    modalTitle: ISelectModal<DataType, KeyType>["title"];
    children: ISelectModal<DataType, KeyType>["renderElement"];

    elements: DataType[];
    fetchData: (search: string) => Promise<DataType[]>;

    /* This will be called, if an id was passed and the element is unknown */
    getElementFromKey: (value: KeyType) => Promise<DetailedDataType>;
};


const BaseSearchField = <
    DataType,
    DetailedDataType = DataType,
    KeyType extends string = string,
    >({
        field,
        form,
        getCaption,
        helperText,
        label,
        required,
        modalTitle,
        getKeyFromElement,
        getElementFromKey,
        fetchData,
        elements,
        children: renderElement,
        ...other
    }: IBaseSearchField<DataType, DetailedDataType, KeyType>) => {
    const {t} = useTranslation();
    const error = form.touched[field.name] && form.touched[field.name];
    const {value} = field;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isFetchingElement, setIsFetchingElement] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<DetailedDataType | null>();

    useEffect(() => {
        // eslint-disable-next-line promise/catch-or-return
        getElementFromKey(value)
            .then(setSelectedElement)
            .finally(() => setIsFetchingElement(false));
    }, [value, getElementFromKey]);

    return (
        <>
            <FormControl>
                <Button variant="outlined" onClick={() => setIsOpen(true)}>
                    {(() => {
                        if (isFetchingElement) {
                            return <CircularProgress size="1rem" color="inherit" />;
                        }
                        if (selectedElement) {
                            return getCaption(selectedElement);
                        }
                        return label ?? t("Auswählen");
                    })()}
                </Button>
                <FormHelperText error={Boolean(error)}>
                    {error ?? helperText}
                </FormHelperText>
            </FormControl>
            <SelectModal<DataType, KeyType>
                {...other}
                elements={elements}
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
                            value: element ? getKeyFromElement(element) : null,
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

BaseSearchField.whyDidYouRender = true;

export default BaseSearchField;
