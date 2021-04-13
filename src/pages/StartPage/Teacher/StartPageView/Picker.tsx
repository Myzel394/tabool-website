import React from "react";
import {DatePicker, DateTimePicker} from "@material-ui/pickers";
import {Dayjs} from "dayjs";
import {useInheritedState} from "hooks";
import {Dialog, DialogActions, DialogContent} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {PrimaryButton, SecondaryButton} from "components";
import {MdCheck, MdClear} from "react-icons/all";


export interface IPicker {
    isOpen: boolean;
    onClose: () => any;
    value: Dayjs | null;
    onUpdate: (newDate: Dayjs | null) => any;
    pickerType: "date" | "datetime";
    renderDay: any;
}

const PICKER_TYPE_COMPONENT_MAP: Record<string, any> = {
    date: DatePicker,
    datetime: DateTimePicker,
};

const Picker = ({
    isOpen,
    onClose,
    onUpdate,
    pickerType,
    renderDay,
    value: parentValue,
}: IPicker) => {
    const {t} = useTranslation();

    const [value, setValue] = useInheritedState<Dayjs | null>(parentValue);

    const PickerComponent = PICKER_TYPE_COMPONENT_MAP[pickerType];

    return (
        <Dialog
            open={isOpen}
            onBackdropClick={onClose}
        >
            <DialogContent style={{padding: 0}}>
                <PickerComponent
                    variant="static"
                    value={value}
                    renderDay={renderDay}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onChange={setValue}
                />
            </DialogContent>
            <DialogActions>
                <SecondaryButton
                    startIcon={<MdClear />}
                    onClick={onClose}
                >
                    {t("Abbrechen")}
                </SecondaryButton>
                <PrimaryButton
                    startIcon={<MdCheck />}
                    onClick={() => {
                        if (value && (parentValue ? !value.isSame(parentValue) : true)) {
                            onUpdate(value);
                        }
                    }}
                >
                    {t("Auswhählen")}
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
};

export default Picker;
