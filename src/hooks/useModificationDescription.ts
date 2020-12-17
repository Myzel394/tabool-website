import {useTranslation} from "react-i18next";
import {ModificationType} from "api";

const useModificationDescription = (modificationType: ModificationType): string | undefined => {
    const {t} = useTranslation();

    return {
        [ModificationType.FreePeriod]: t("Freistunde"),
        [ModificationType.Replacement]: t("Vertretung"),
        [ModificationType.RoomChange]: t("Raumänderung"),
        [ModificationType.SelfLearn]: t("Selbstorganisiertes Lernen"),
    }[modificationType];
};

export default useModificationDescription;
