import {ModificationType} from "api";
import {StudentModificationDetail} from "types";

import modificationStyle from "./modifications.module.scss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MODIFICATION_CLASS_MAP: Record<ModificationType, string> = {
    [ModificationType.FreePeriod]: modificationStyle.isFreePeriod,
    [ModificationType.Replacement]: modificationStyle.isModificationAvailable,
    [ModificationType.SelfLearn]: modificationStyle.isFreePeriod,
};

const getModificationClass = (modifications: StudentModificationDetail[]): string | undefined => {
    if (modifications.length === 1) {
        const {modificationType} = modifications[0];

        return MODIFICATION_CLASS_MAP[modificationType] ?? modificationStyle.isModificationAvailable;
    }
    return undefined;
};

export default getModificationClass;
