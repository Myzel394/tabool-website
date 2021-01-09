import {MaterialApprox} from "types";
import {convertToDate} from "api";

const parseMaterialApprox = async (material: MaterialApprox): Promise<void> => {
    convertToDate(material, ["addedAt"]);
};

export default parseMaterialApprox;
