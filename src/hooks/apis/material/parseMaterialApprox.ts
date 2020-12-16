import {MaterialApprox} from "types";
import {convertToDate} from "api";

const parseMaterialApprox = (material: MaterialApprox): void => {
    convertToDate(material, ["addedAt"]);
};

export default parseMaterialApprox;
