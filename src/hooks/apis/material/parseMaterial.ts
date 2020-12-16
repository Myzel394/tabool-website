import {convertToDate} from "api";
import {MaterialDetail} from "types";

const parseMaterial = (material: MaterialDetail): void => {
    convertToDate(material, ["addedAt"]);
};

export default parseMaterial;
