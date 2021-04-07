import React from "react";
import {DatePicker} from "@material-ui/pickers";
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
}

const Picker = ({
    isOpen,
    onClose,
    onUpdate,
    value: parentValue,
}: IPicker) => {
    const {t} = useTranslation();

    const [value, setValue] = useInheritedState<Dayjs | null>(parentValue);

    return (
        <Dialog
            open={isOpen}
            onBackdropClick={onClose}
        >
            <DialogContent style={{padding: 0}}>
                <DatePicker
                    variant="static"
                    value={value}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onChange={setValue}
                />
            </DialogContent>
            <DialogActions>
                <SecondaryButton
                    startIcon={<MdClear />}
                    onClick={() => onUpdate(null)}
                >
                    {t("Leeren")}
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
