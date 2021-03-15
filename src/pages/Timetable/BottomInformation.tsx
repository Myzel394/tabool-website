import React, {useContext} from "react";
import {BottomSheet} from "components";
import {useTranslation} from "react-i18next";

import TimetableContext from "./TimetableContext";
import BottomContent from "./BottomContent";


const BottomInformation = () => {
    const {t} = useTranslation();
    const {
        selectedDate,
        onSelectedDateChange,
    } = useContext(TimetableContext);

    return (
        <BottomSheet
            variant="persistent"
            isOpen={Boolean(selectedDate)}
            onClose={() => onSelectedDateChange(null)}
        >
            <>
                {selectedDate && (
                    <>
                        <BottomContent date={selectedDate} />
                    </>
                )}
            </>
        </BottomSheet>
    );
};

export default BottomInformation;
