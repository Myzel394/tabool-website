import {convertToDate} from "api";
import {MaterialDetail} from "types";

const parseMaterial = async (material: MaterialDetail): Promise<void> => {
    convertToDate(material, ["addedAt"]);
};

export default parseMaterial;
